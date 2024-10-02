using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Exceptions;
using System.Net;

namespace backend.Services;

public class FirestoreService : IFirestoreService
{
    private FirestoreDb _firestoreDb;
    private readonly ILogger<FirestoreService> _log;

    public FirestoreService(ILogger<FirestoreService> log)
    {
        _firestoreDb = FirestoreDb.Create("ourcourseville");
        _log = log;
    }

    public async Task<Record> AddDocumentAsync(RecordDTO recordDTO)
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
            DocumentReference document = _firestoreDb.Collection("records").Document();
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

    public async Task<List<Record>> GetDocumentAsync(string documentId)
    {
        DocumentReference docRef = _firestoreDb.Collection("your-collection").Document(documentId);
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
        if (snapshot.Exists)
        {
            Console.WriteLine($"Document data: {snapshot.ToDictionary()}");
        }
        else
        {
            Console.WriteLine("Document does not exist.");
        }

        return null;
    }
}
