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

    private int? facultyTTL;
    private int? courseTTL;

    public required int Faculty
    {
        get => facultyTTL ?? throw new ArgumentNullException(nameof(facultyTTL));
        set
        {
            facultyTTL = value;
            FacultyTTL = TimeSpan.FromSeconds(value);
        }
    }

    public required int Course
    {
        get => courseTTL ?? throw new ArgumentNullException(nameof(courseTTL));
        set
        {
            courseTTL = value;
            CourseTTL = TimeSpan.FromSeconds(value);
        }
    }

    public TimeSpan FacultyTTL { get; private set; }
    public TimeSpan CourseTTL { get; private set; }
}