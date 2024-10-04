using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;
using backend.Exceptions;
using backend.Parsers;

namespace backend.Controllers;


[Route("course")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseSvc;
    private readonly ILogger<CourseController> _log;

    public CourseController(ICourseService courseSvc, ILogger<CourseController> log)
    {
        _courseSvc = courseSvc;
        _log = log;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] CourseDTO courseDTO)
    {
        try
        {
            var course = await _courseSvc.Create(courseDTO);
            return Ok(CourseParser.ModelToDTO(course));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }

    [HttpGet("faculty/{facultyCode}")]
    public async Task<IActionResult> FindCourseByFacultyCode(string facultyCode)
    {
        try
        {
            var faculties = await _courseSvc.FindByFacultyCode(facultyCode);
            return Ok(CourseParser.ModelToDTOList(faculties));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> FindCourseByCode(string code)
    {
        try
        {
            var course = await _courseSvc.FindByCode(code);
            if (course == null)
            {
                return NotFound(new JSONResponse($"No course with code {code} found"));
            }

            return Ok(CourseParser.ModelToDTO(course));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }
}