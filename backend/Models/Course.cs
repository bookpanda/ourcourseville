using Google.Cloud.Firestore;

namespace backend.Models;

[FirestoreData]
public class Course
{
    [FirestoreProperty]
    public string? ID { get; set; }
    [FirestoreProperty]
    public required string FacultyCode { get; set; }
    [FirestoreProperty]
    public required string Code { get; set; }
    [FirestoreProperty]
    public required string Icon { get; set; }
    [FirestoreProperty]
    public required string Name { get; set; }
    [FirestoreProperty]
    public required Timestamp CreatedAt { get; set; }
}
