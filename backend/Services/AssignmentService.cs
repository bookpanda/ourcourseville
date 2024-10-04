using Google.Cloud.Firestore;
using backend.DTO;
using backend.Services.Interfaces;
using backend.Data;
using backend.Exceptions;
using System.Net;

namespace backend.Services;

public class AssignmentService : IAssignmentService
{
    private readonly ICourseService _courseSvc;
    private readonly CollectionReference _assignments;
    private readonly ILogger<AssignmentService> _log;

    public AssignmentService(ICourseService courseSvc, Firestore fs, ILogger<AssignmentService> log)
    {
        _courseSvc = courseSvc;
        _assignments = fs.assignments;
        _log = log;
    }

    public async Task<Assignment> Create(AssignmentDTO assignmentDTO)
    {
        // check if course exists
        var course = await _courseSvc.FindByCode(assignmentDTO.CourseCode);
        if (course == null)
        {
            _log.LogError($"Course with code {assignmentDTO.CourseCode} does not exist");
            throw new ServiceException($"Course with code {assignmentDTO.CourseCode} does not exist", HttpStatusCode.NotFound);
        }

        var newAssignment = new Assignment
        {
            CourseCode = assignmentDTO.CourseCode,
            Code = assignmentDTO.Code,
            Name = assignmentDTO.Name,
            CreatedAt = Timestamp.GetCurrentTimestamp()
        };

        try
        {
            DocumentReference document = _assignments.Document();
            await document.SetAsync(newAssignment);
            newAssignment.ID = document.Id;

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
