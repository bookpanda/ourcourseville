using Google.Cloud.Firestore;
using backend.DTO;
using backend.Services.Interfaces;
using backend.Data;
using backend.Exceptions;
using System.Net;

namespace backend.Services;

#pragma warning disable CS1998 // disable warning for RunTransactionAsync having no await
public class AssignmentService : IAssignmentService
{
    private readonly FirestoreDb _db;
    private readonly CollectionReference _courses;
    private readonly CollectionReference _assignments;
    private readonly ILogger<AssignmentService> _log;

    public AssignmentService(Firestore fs, ILogger<AssignmentService> log)
    {
        _db = fs.db;
        _courses = fs.courses;
        _assignments = fs.assignments;
        _log = log;
    }

    public async Task<Assignment> Create(AssignmentDTO assignmentDTO)
    {
        var newAssignment = new Assignment
        {
            CourseCode = assignmentDTO.CourseCode,
            Code = assignmentDTO.Code,
            Name = assignmentDTO.Name,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            var courseSnapshot = await _courses
                   .WhereEqualTo("Code", assignmentDTO.CourseCode)
                   .Limit(1).GetSnapshotAsync();
            if (courseSnapshot.Documents.Count == 0)
            {
                _log.LogInformation($"Course with code {assignmentDTO.CourseCode} does not exist");
                throw new ServiceException($"Course with code {assignmentDTO.CourseCode} does not exist", HttpStatusCode.NotFound);
            }

            DocumentReference courseDoc = courseSnapshot.Documents[0].Reference;
            DocumentReference asgmDoc = _assignments.Document();

            await _db.RunTransactionAsync(async transaction =>
            {
                transaction.Set(asgmDoc, newAssignment);
                transaction.Set(courseDoc, new { Count = FieldValue.Increment(1) }, SetOptions.MergeAll);
                newAssignment.ID = asgmDoc.Id;
            });

            return newAssignment;
        }
        catch (ServiceException ex)
        {
            throw new ServiceException(ex.Message, HttpStatusCode.InternalServerError);
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error adding assignment");
            throw new ServiceException("Error adding assignment", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<List<Assignment>> FindByCourseCode(string courseCode)
    {
        try
        {
            Query query = _assignments.WhereEqualTo("CourseCode", courseCode);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            List<Assignment> assignments = new List<Assignment>();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    Assignment assignment = document.ConvertTo<Assignment>();
                    assignment.ID = document.Id;
                    assignments.Add(assignment);
                }
                else
                {
                    _log.LogWarning($"Assignment with ID {document.Id} does not exist");
                }
            }

            return assignments;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding assignment with course code {courseCode}");
            throw new ServiceException($"Error finding assignment with course code {courseCode}", HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<Assignment?> FindByCode(string code)
    {
        try
        {
            Query query = _assignments.WhereEqualTo("Code", code);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            if (snapshot.Documents.Count == 0) return null;

            DocumentSnapshot document = snapshot.Documents[0];
            if (!document.Exists) return null;

            var assignment = document.ConvertTo<Assignment>();
            assignment.ID = document.Id;

            return assignment;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, $"Error finding assignment with code {code}");
            throw new ServiceException($"Error finding assignment with code {code}", HttpStatusCode.InternalServerError, ex);
        }
    }
}
