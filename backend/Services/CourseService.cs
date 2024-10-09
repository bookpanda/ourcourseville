using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Data;
using backend.Exceptions;
using System.Net;
using backend.Config;
using backend.Repositories.Interfaces;
using Microsoft.Extensions.Options;

namespace backend.Services;

#pragma warning disable CS1998 // disable warning for RunTransactionAsync having no await
public class CourseService : ICourseService
{
    private readonly TTLConfig _conf;
    private readonly ICacheRepository _cache;
    private readonly IFacultyService _facultySvc;
    private readonly FirestoreDb _db;
    private readonly CollectionReference _faculties;
    private readonly CollectionReference _courses;
    private readonly ILogger<CourseService> _log;

    public CourseService(IOptions<TTLConfig> conf, ICacheRepository cache, IFacultyService facultySvc, Firestore fs, ILogger<CourseService> log)
    {
        _conf = conf.Value;
        _cache = cache;
        _facultySvc = facultySvc;
        _db = fs.db;
        _faculties = fs.faculties;
        _courses = fs.courses;
        _log = log;
    }

    public async Task<Course> Create(CourseDTO courseDTO)
    {
        // check if faculty exists
        var faculty = await _facultySvc.FindByCode(courseDTO.FacultyCode);
        if (faculty == null)
        {
            _log.LogError($"Faculty with code {courseDTO.FacultyCode} does not exist");
            throw new ServiceException($"Faculty with code {courseDTO.FacultyCode} does not exist", HttpStatusCode.NotFound);
        }

        var newCourse = new Course
        {
            FacultyCode = courseDTO.FacultyCode,
            Code = courseDTO.Code,
            Icon = courseDTO.Icon,
            Name = courseDTO.Name,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            var facultySnapshot = await _faculties
                .WhereEqualTo("Code", courseDTO.FacultyCode)
                .Limit(1).GetSnapshotAsync();
            if (facultySnapshot.Documents.Count == 0)
            {
                _log.LogInformation($"Faculty with code {courseDTO.FacultyCode} does not exist");
                throw new ServiceException($"Faculty with code {courseDTO.FacultyCode} does not exist", HttpStatusCode.NotFound);
            }

            DocumentReference facultyDoc = facultySnapshot.Documents[0].Reference;
            DocumentReference courseDoc = _courses.Document();

            await _db.RunTransactionAsync(async transaction =>
            {
                transaction.Set(courseDoc, newCourse);
                transaction.Set(facultyDoc, new { Count = FieldValue.Increment(1) }, SetOptions.MergeAll);
                newCourse.ID = courseDoc.Id;
            });

            return newCourse;
        }
        catch (ServiceException ex)
        {
            throw new ServiceException(ex.Message, HttpStatusCode.InternalServerError);
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error adding course");
            throw new ServiceException("Error adding course", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<List<Course>> FindByFacultyCode(string facultyCode)
    {
        try
        {
            var cacheVal = await _cache.GetAsync<List<Course>>(FindByFacultyKey(facultyCode));
            if (cacheVal != null) return cacheVal;

            Query query = _courses.WhereEqualTo("FacultyCode", facultyCode);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            List<Course> courses = new List<Course>();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    Course course = document.ConvertTo<Course>();
                    course.ID = document.Id;
                    courses.Add(course);
                }
                else
                {
                    _log.LogWarning($"Course with ID {document.Id} does not exist");
                }
            }

            await _cache.SetAsync(FindByFacultyKey(facultyCode), courses, _conf.CourseTTL);

            return courses;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding course with faculty code {facultyCode}");
            throw new ServiceException($"Error finding course with faculty code {facultyCode}", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<Course?> FindByCode(string code)
    {
        try
        {
            var cacheVal = await _cache.GetAsync<Course>(FindByCodeKey(code));
            if (cacheVal != null) return cacheVal;

            Query query = _courses.WhereEqualTo("Code", code);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            if (snapshot.Documents.Count == 0) return null;

            DocumentSnapshot document = snapshot.Documents[0];
            if (!document.Exists) return null;

            var course = document.ConvertTo<Course>();
            course.ID = document.Id;

            await _cache.SetAsync(FindByCodeKey(code), course, _conf.CourseTTL);

            return course;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding course with code {code}");
            throw new ServiceException($"Error finding course with code {code}", HttpStatusCode.InternalServerError, ex);
        }
    }

    private string FindByFacultyKey(string code) => $"course-faculty-:{code}";
    private string FindByCodeKey(string code) => $"course-code-:{code}";
}
