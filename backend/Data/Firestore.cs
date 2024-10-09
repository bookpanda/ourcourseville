using Google.Cloud.Firestore;
using backend.Config;
using Microsoft.Extensions.Options;

namespace backend.Data;

public class Firestore
{
    private readonly FirestoreConfig _config;
    public FirestoreDb db;
    public CollectionReference faculties;
    public CollectionReference courses;
    public CollectionReference assignments;
    public CollectionReference records;

    public Firestore(IOptions<FirestoreConfig> config)
    {
        _config = config.Value;
        db = FirestoreDb.Create(_config.DB);
        faculties = db.Collection(_config.Faculties);
        courses = db.Collection(_config.Courses);
        assignments = db.Collection(_config.Assignments);
        records = db.Collection(_config.Records);
    }
}
