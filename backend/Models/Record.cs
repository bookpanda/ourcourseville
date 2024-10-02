using Google.Cloud.Firestore;

namespace backend.Models;

[FirestoreData]
public class Record
{
    [FirestoreProperty]
    public string? ID { get; set; }
    [FirestoreProperty]
    public required string CourseCode { get; set; }
    [FirestoreProperty]
    public required string CourseID { get; set; }
    [FirestoreProperty]
    public required string Course { get; set; }
    [FirestoreProperty]
    public required string AssignmentID { get; set; }
    [FirestoreProperty]
    public required string Assignment { get; set; }
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