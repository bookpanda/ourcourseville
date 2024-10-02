using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Exceptions;
using System.Net;
using backend.Config;
using Microsoft.Extensions.Options;

namespace backend.Services;

public class RecordService : IRecordService
{
    private readonly RecordConfig _config;
    private FirestoreDb _recordDB;
    private CollectionReference _collection;
    private readonly ILogger<RecordService> _log;

    public RecordService(IOptions<RecordConfig> config, ILogger<RecordService> log)
    {
        _config = config.Value;
        _recordDB = FirestoreDb.Create(_config.DB);
        _collection = _recordDB.Collection(_config.Collection);
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
            DocumentReference document = _collection.Document();
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
        DocumentReference docRef = _collection.Document(id);
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
