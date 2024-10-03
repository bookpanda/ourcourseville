using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Config;
using Microsoft.Extensions.Options;

namespace backend.Services;

public class CourseService : ICourseService
{
    private readonly FirestoreConfig _config;
    private FirestoreDb _courseDB;
    private CollectionReference _collection;
    private readonly ILogger<CourseService> _log;

    public CourseService(IOptions<FirestoreConfig> config, ILogger<CourseService> log)
    {
        _config = config.Value;
        _courseDB = FirestoreDb.Create(_config.DB);
        _collection = _courseDB.Collection(_config.Courses);
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
