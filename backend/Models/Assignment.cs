using Google.Cloud.Firestore;

namespace backend.DTO;

[FirestoreData]
public class Assignment
{
    [FirestoreProperty]
    public string? ID { get; set; }
    [FirestoreProperty]
    public required string CourseCode { get; set; }
    [FirestoreProperty]
    public required string Code { get; set; }
    [FirestoreProperty]
    public required string Name { get; set; }
    [FirestoreProperty]
    public required Timestamp CreatedAt { get; set; }
}