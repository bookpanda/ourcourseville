using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Config;
using Microsoft.Extensions.Options;
using backend.Data;

namespace backend.Services;

public class FacultyService : IFacultyService
{
    private CollectionReference _faculties;
    private readonly ILogger<FacultyService> _log;

    public FacultyService(Firestore fs, ILogger<FacultyService> log)
    {
        _faculties = fs.faculties;
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
