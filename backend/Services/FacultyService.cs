using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Config;
using Microsoft.Extensions.Options;

namespace backend.Services;

public class FacultyService : IFacultyService
{
    private readonly FirestoreConfig _config;
    private FirestoreDb _facultyDB;
    private CollectionReference _collection;
    private readonly ILogger<FacultyService> _log;

    public FacultyService(IOptions<FirestoreConfig> config, ILogger<FacultyService> log)
    {
        _config = config.Value;
        _facultyDB = FirestoreDb.Create(_config.DB);
        _collection = _facultyDB.Collection(_config.Faculties);
        _log = log;
    }

    public async Task<Faculty> Create(FacultyDTO facultyDTO)
    {
        throw new NotImplementedException();
    }
    public async Task<List<Faculty>> FindAll()
    {
        throw new NotImplementedException();
    }
    public async Task<Faculty> FindByCode(string code)
    {
        throw new NotImplementedException();
    }
}
