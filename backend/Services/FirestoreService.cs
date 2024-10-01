using FirebaseAdmin;
using Google.Cloud.Firestore;
using Google.Apis.Auth.OAuth2;
using System;
using System.Threading.Tasks;

public class FirestoreService
{
    private FirestoreDb _firestoreDb;

    public FirestoreService()
    {
        // Path to your service account key file
        var pathToCredentials = @"path/to/serviceAccountKey.json";

        // Initialize the Firebase Admin SDK with the service account
        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile(pathToCredentials)
        });

        // Initialize Firestore
        _firestoreDb = FirestoreDb.Create("your-project-id"); // Your Firebase Project ID
    }

    public async Task AddDocumentAsync()
    {
        CollectionReference collection = _firestoreDb.Collection("your-collection");
        DocumentReference document = await collection.AddAsync(new
        {
            Name = "Sample Document",
            CreatedAt = Timestamp.GetCurrentTimestamp()
        });
        Console.WriteLine($"Added document with ID: {document.Id}");
    }

    public async Task GetDocumentAsync(string documentId)
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
    }
}
