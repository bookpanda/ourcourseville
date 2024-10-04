using Google.Cloud.Firestore;

namespace backend.Models;

[FirestoreData]
public class Record
{
    [FirestoreProperty]
    public string? ID { get; set; }
    [FirestoreProperty]
    public required string AssignmentCode { get; set; }
    [FirestoreProperty]
    public required List<Problem> Problems { get; set; }
    [FirestoreProperty]
    public required Timestamp CreatedAt { get; set; }
}

[FirestoreData]
public class Problem
{
    [FirestoreProperty]
    public required string Question { get; set; }
    [FirestoreProperty]
    public required string Answer { get; set; }
}