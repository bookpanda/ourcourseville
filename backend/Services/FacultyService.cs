using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Data;
using backend.Exceptions;
using System.Net;
using backend.Config;
using Microsoft.Extensions.Options;
using backend.Repositories.Interfaces;

namespace backend.Services;

public class FacultyService : IFacultyService
{
    private readonly TTLConfig _conf;
    private readonly ICacheRepository _cache;
    private readonly CollectionReference _faculties;
    private readonly ILogger<FacultyService> _log;

    public FacultyService(IOptions<TTLConfig> conf, ICacheRepository cache, Firestore fs, ILogger<FacultyService> log)
    {
        _conf = conf.Value;
        _cache = cache;
        _faculties = fs.faculties;
        _log = log;
    }

    public async Task<Faculty> Create(FacultyDTO facultyDTO)
    {
        var newFaculty = new Faculty
        {
            Code = facultyDTO.Code,
            Name = facultyDTO.Name,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            DocumentReference document = _faculties.Document();
            await document.SetAsync(newFaculty);
            newFaculty.ID = document.Id;

            return newFaculty;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error adding faculty");
            throw new ServiceException("Error adding faculty", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<List<Faculty>> FindAll()
    {
        try
        {
            var cacheVal = await _cache.GetAsync<List<Faculty>>(FindAllKey());
            if (cacheVal != null) return cacheVal;

            QuerySnapshot snapshot = await _faculties.GetSnapshotAsync();
            List<Faculty> faculties = new List<Faculty>();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    Faculty faculty = document.ConvertTo<Faculty>();
                    faculty.ID = document.Id;
                    faculties.Add(faculty);
                }
                else
                {
                    _log.LogWarning($"Faculty with ID {document.Id} does not exist");
                }
            }

            await _cache.SetAsync(FindAllKey(), faculties, _conf.FacultyTTL);

            return faculties;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error finding all faculties");
            throw new ServiceException("Error finding all faculties", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<Faculty?> FindByCode(string code)
    {
        try
        {
            var cacheVal = await _cache.GetAsync<Faculty>(FindByCodeKey(code));
            if (cacheVal != null) return cacheVal;

            Query query = _faculties.WhereEqualTo("Code", code);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            if (snapshot.Documents.Count == 0) return null;

            DocumentSnapshot document = snapshot.Documents[0];
            if (!document.Exists) return null;

            var faculty = document.ConvertTo<Faculty>();
            faculty.ID = document.Id;

            await _cache.SetAsync(FindByCodeKey(code), faculty, _conf.FacultyTTL);

            return faculty;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding faculty with code {code}");
            throw new ServiceException($"Error finding faculty with code {code}", HttpStatusCode.InternalServerError, ex);
        }
    }

    private string FindAllKey() => $"faculty-all";
    private string FindByCodeKey(string code) => $"faculty-code-:{code}";
}
