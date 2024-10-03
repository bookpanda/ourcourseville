namespace backend.Config;

public class FirestoreConfig
{
    public const string Firestore = "Firestore";
    public required string DB { get; set; }
    public required string Faculties { get; set; }
    public required string Courses { get; set; }
    public required string Records { get; set; }
}
