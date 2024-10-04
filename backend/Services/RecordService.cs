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
    private readonly IAssignmentService _assignmentSvc;
    private readonly CollectionReference _records;
    private readonly ILogger<RecordService> _log;

    public RecordService(IAssignmentService assignmentSvc, Firestore fs, ILogger<RecordService> log)
    {
        _assignmentSvc = assignmentSvc;
        _records = fs.records;
        _log = log;
    }

    public async Task<Record> Create(CreateRecordDTO recordDTO)
    {
        var newRecord = new Record
        {
            AssignmentCode = recordDTO.AssignmentCode,
            Problems = recordDTO.Problems,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            // check assignment exists, create if not
            var assignment = await _assignmentSvc.FindByCode(recordDTO.AssignmentCode);
            if (assignment == null)
            {
                _log.LogInformation($"Assignment with code {recordDTO.AssignmentCode} does not exist, creating new assignment");
                var newAsgm = await _assignmentSvc.Create(new AssignmentDTO
                {
                    CourseCode = recordDTO.CourseCode,
                    Code = recordDTO.CourseCode,
                    Name = recordDTO.Course
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

    public async Task<List<Record>> FindByAssignmentCode(string asgmCode)
    {
        try
        {
            Query query = _records.WhereEqualTo("AssignmentCode", asgmCode);
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
            _log.LogError(ex, $"Error finding record with AssignmentCode {asgmCode}");
            throw new ServiceException($"Error finding record with AssignmentCode {asgmCode}", HttpStatusCode.InternalServerError, ex);
        }
    }
}
