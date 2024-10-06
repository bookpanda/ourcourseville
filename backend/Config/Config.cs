namespace backend.Config;

public class FirestoreConfig
{
    public const string Firestore = "Firestore";
    public required string DB { get; set; }
    public required string Faculties { get; set; }
    public required string Courses { get; set; }
    public required string Assignments { get; set; }
    public required string Records { get; set; }
}

public class TTLConfig
{
    public const string TTL = "TTL";
    public required int Faculty { get; set; }
    public required int Course { get; set; }
}