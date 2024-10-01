using FirebaseAdmin;
using Google.Cloud.Firestore;
using Google.Apis.Auth.OAuth2;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services;

public class FirestoreService : IFirestoreService
{
    private FirestoreDb _firestoreDb;

    public FirestoreService()
    {
        if (FirebaseApp.DefaultInstance == null)
        {
            var pathToCredentials = @"firebase-adminsdk.json";

            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(pathToCredentials)
            });

        }
        _firestoreDb = FirestoreDb.Create("ourcourseville");
    }

    public async Task AddDocumentAsync(RecordDTO recordDTO)
    {
        CollectionReference collection = _firestoreDb.Collection("records");
        DocumentReference document = await collection.AddAsync(new Record
        {
            CourseCode = recordDTO.CourseCode,
            CourseID = recordDTO.CourseID,
            Course = recordDTO.Course,
            AssignmentID = recordDTO.AssignmentID,
            Assignment = recordDTO.Assignment,
            Problems = recordDTO.Problems,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        });
        Console.WriteLine($"Added document with ID: {document.Id}");
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
