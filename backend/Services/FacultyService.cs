using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Data;
using backend.Exceptions;
using System.Net;

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

            return faculties;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error finding all faculties");
            throw new ServiceException("Error finding all faculties", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<Faculty> FindByCode(string code)
    {
        try
        {
            Query query = _faculties.WhereEqualTo("Code", code);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            DocumentSnapshot document = snapshot.Documents[0];
            if (!document.Exists)
            {
                _log.LogError($"No faculty with code {code}");
                throw new ServiceException($"No faculty with code {code}", HttpStatusCode.NotFound);
            }

            var faculty = document.ConvertTo<Faculty>();
            faculty.ID = document.Id;

            return faculty;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding faculty with code {code}");
            throw new ServiceException($"Error finding faculty with code {code}", HttpStatusCode.InternalServerError, ex);
        }
    }
}
