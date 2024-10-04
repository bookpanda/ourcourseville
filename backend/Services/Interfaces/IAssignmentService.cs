using backend.DTO;

namespace backend.Services.Interfaces;

public interface IAssignmentService
{
    Task<Assignment> Create(AssignmentDTO assignmentDTO);
    Task<List<Assignment>> FindByCourseCode(string courseCode);
    Task<Assignment?> FindByCode(string code);
}