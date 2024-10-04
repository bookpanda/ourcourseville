using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Data;
using backend.Exceptions;
using System.Net;

namespace backend.Services;

public class CourseService : ICourseService
{
    private readonly FacultyService _facultySvc;
    private readonly CollectionReference _courses;
    private readonly ILogger<CourseService> _log;

    public CourseService(FacultyService facultySvc, Firestore fs, ILogger<CourseService> log)
    {
        _facultySvc = facultySvc;
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
            Name = courseDTO.Name,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            DocumentReference document = _courses.Document();
            await document.SetAsync(newCourse);
            newCourse.ID = document.Id;

            return newCourse;
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

            return courses;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding course with faculty code {facultyCode}");
            throw new ServiceException($"Error finding course with faculty code {facultyCode}", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<Course> FindByCode(string code)
    {
        try
        {
            Query query = _courses.WhereEqualTo("Code", code);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            DocumentSnapshot document = snapshot.Documents[0];
            if (!document.Exists)
            {
                _log.LogError($"No course with code {code}");
                throw new ServiceException($"No course with code {code}", HttpStatusCode.NotFound);
            }

            var course = document.ConvertTo<Course>();
            course.ID = document.Id;

            return course;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding course with code {code}");
            throw new ServiceException($"Error finding course with code {code}", HttpStatusCode.InternalServerError, ex);
        }
    }
}
