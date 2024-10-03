using Google.Cloud.Firestore;
using backend.Config;
using Microsoft.Extensions.Options;

namespace backend.Data;

public class Firestore
{
    private readonly FirestoreConfig _config;
    private FirestoreDb _db;
    public CollectionReference faculties;
    public CollectionReference courses;
    public CollectionReference records;

    public Firestore(IOptions<FirestoreConfig> config)
    {
        _config = config.Value;
        _db = FirestoreDb.Create(_config.DB);
        faculties = _db.Collection(_config.Faculties);
        courses = _db.Collection(_config.Courses);
        records = _db.Collection(_config.Records);
    }
}
