using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;
using backend.Exceptions;
using backend.Parsers;

namespace backend.Controllers;


[Route("assignment")]
[ApiController]
public class AssignmentController : ControllerBase
{
    private readonly IAssignmentService _assignmentSvc;
    private readonly ILogger<AssignmentController> _log;

    public AssignmentController(IAssignmentService assignmentSvc, ILogger<AssignmentController> log)
    {
        _assignmentSvc = assignmentSvc;
        _log = log;
    }

    [HttpGet("course/{code}")]
    public async Task<IActionResult> FindAssignmentByCourseCode(string code)
    {
        try
        {
            var assignments = await _assignmentSvc.FindByCourseCode(code);

            return Ok(AssignmentParser.ModelToDTOList(assignments));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }
}