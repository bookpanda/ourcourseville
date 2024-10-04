using Google.Cloud.Firestore;
using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using backend.Exceptions;
using System.Net;
using backend.Data;

namespace backend.Services;

public class RecordService : IRecordService
{
    private readonly ICourseService _courseSvc;
    private readonly CollectionReference _records;
    private readonly ILogger<RecordService> _log;

    public RecordService(ICourseService courseSvc, Firestore fs, ILogger<RecordService> log)
    {
        _courseSvc = courseSvc;
        _records = fs.records;
        _log = log;
    }

    public async Task<Record> Create(RecordDTO recordDTO)
    {
        var newRecord = new Record
        {
            CourseCode = recordDTO.CourseCode,
            CourseID = recordDTO.CourseID,
            Course = recordDTO.Course,
            AssignmentID = recordDTO.AssignmentID,
            Assignment = recordDTO.Assignment,
            Problems = recordDTO.Problems,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            // check course exists, create if not
            var course = await _courseSvc.FindByCode(newRecord.CourseCode);
            if (course == null)
            {
                _log.LogInformation($"Course with code {newRecord.CourseCode} does not exist, creating new course");
                var newCourse = await _courseSvc.Create(new CourseDTO
                {
                    FacultyCode = newRecord.CourseCode.Substring(0, 2),
                    Code = newRecord.CourseCode,
                    Name = newRecord.Course
                });
            }

            DocumentReference document = _records.Document();
            await document.SetAsync(newRecord);
            _log.LogInformation($"Added record with ID: {document.Id}");
            newRecord.ID = document.Id;

            return newRecord;
        }
        catch (ServiceException ex)
        {
            throw new ServiceException(ex.Message, HttpStatusCode.InternalServerError);
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error adding record");
            throw new ServiceException("Error adding record", HttpStatusCode.InternalServerError, ex);
        }
    }

    public async Task<Record?> FindOne(string id)
    {
        try
        {
            DocumentReference docRef = _records.Document(id);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
            if (!snapshot.Exists) return null;

            var record = snapshot.ConvertTo<Record>();
            record.ID = snapshot.Id;

            return record;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding record with id {id}");
            throw new ServiceException($"Error finding record with id {id}", HttpStatusCode.InternalServerError, ex);
        }
    }

    public async Task<List<Record>> FindByAssignmentID(string asgmID)
    {
        try
        {
            Query query = _records.WhereEqualTo("AssignmentID", asgmID);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            List<Record> records = new List<Record>();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    Record record = document.ConvertTo<Record>();
                    record.ID = document.Id;
                    records.Add(record);
                }
                else
                {
                    _log.LogWarning($"Record with ID {document.Id} does not exist");
                }
            }

            return records;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding record with AssignmentID {asgmID}");
            throw new ServiceException($"Error finding record with AssignmentID {asgmID}", HttpStatusCode.InternalServerError, ex);
        }
    }

    public async Task<List<Record>> FindByCourseCode(string courseCode)
    {
        try
        {
            Query query = _records.WhereEqualTo("CourseCode", courseCode);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            List<Record> records = new List<Record>();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    Record record = document.ConvertTo<Record>();
                    record.ID = document.Id;
                    records.Add(record);
                }
                else
                {
                    _log.LogWarning($"Record with ID {document.Id} does not exist");
                }
            }

            return records;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding record with course code {courseCode}");
            throw new ServiceException($"Error finding record with course code {courseCode}", HttpStatusCode.InternalServerError, ex);
        }
    }
}
