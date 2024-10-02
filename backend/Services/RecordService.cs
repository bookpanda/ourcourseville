using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Exceptions;
using System.Net;

namespace backend.Services;

public class RecordService : IRecordService
{
    private FirestoreDb _recordDB;
    private readonly ILogger<RecordService> _log;

    public RecordService(ILogger<RecordService> log)
    {
        _recordDB = FirestoreDb.Create("ourcourseville");
        _log = log;
    }

    public async Task<Record> Create(RecordDTO recordDTO)
    {
        var newRecord = new Record
        {
            CourseCode = recordDTO.CourseCode,
            CourseID = recordDTO.CourseID,
            Course = recordDTO.Course,
            AssignmentID = recordDTO.AssignmentID,
            Assignment = recordDTO.Assignment,
            Problems = recordDTO.Problems,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            DocumentReference document = _recordDB.Collection("records").Document();
            await document.SetAsync(newRecord);
            _log.LogInformation($"Added document with ID: {document.Id}");
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error adding document");
            throw new ServiceException("Error adding document", HttpStatusCode.InternalServerError, ex);
        }

        return newRecord;
    }

    public async Task<Record> FindOne(string id)
    {
        DocumentReference docRef = _recordDB.Collection("records").Document(id);
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
        if (!snapshot.Exists)
        {
            _log.LogError($"No document with id {id}");
            throw new ServiceException($"No document with id {id}", HttpStatusCode.NotFound);
        }

        return snapshot.ConvertTo<Record>();
    }

    public async Task<List<Record>> Find()
    {
        throw new NotImplementedException("This method is not implemented yet.");
    }
}
