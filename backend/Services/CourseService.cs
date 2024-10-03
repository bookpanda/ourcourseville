using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Config;
using Microsoft.Extensions.Options;
using backend.Data;

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
        throw new NotImplementedException();
    }
    public async Task<List<Course>> FindByFacultyID(string id)
    {
        throw new NotImplementedException();
    }
    public async Task<Course> FindByCode(string code)
    {
        throw new NotImplementedException();
    }
}
