using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Config;
using Microsoft.Extensions.Options;
using backend.Data;
using backend.Exceptions;
using System.Net;

namespace backend.Services;

public class CourseService : ICourseService
{
    private CollectionReference _courses;
    private readonly ILogger<CourseService> _log;

    public CourseService(Firestore fs, ILogger<CourseService> log)
    {
        _courses = fs.courses;
        _log = log;
    }

    public async Task<Course> Create(CourseDTO courseDTO)
    {
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
    public async Task<List<Course>> FindByFacultyCode(string code)
    {
        throw new NotImplementedException();
    }
    public async Task<Course> FindByCode(string code)
    {
        throw new NotImplementedException();
    }
}
