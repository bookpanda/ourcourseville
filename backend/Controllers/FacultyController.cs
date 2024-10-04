using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;
using backend.Exceptions;
using backend.Parsers;

namespace backend.Controllers;


[Route("faculty")]
[ApiController]
public class FacultyController : ControllerBase
{
    private readonly IFacultyService _facultySvc;
    private readonly ILogger<FacultyController> _log;

    public FacultyController(IFacultyService facultySvc, ILogger<FacultyController> log)
    {
        _facultySvc = facultySvc;
        _log = log;
    }

    [HttpPost]
    public async Task<IActionResult> CreateFaculty([FromBody] FacultyDTO facultyDTO)
    {
        try
        {
            var faculty = await _facultySvc.Create(facultyDTO);
            return Ok(FacultyParser.ModelToDTO(faculty));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }

    [HttpGet]
    public async Task<IActionResult> FindAllFaculty()
    {
        try
        {
            var faculties = await _facultySvc.FindAll();
            return Ok(FacultyParser.ModelToDTOList(faculties));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> FindFacultyByCode(string code)
    {
        try
        {
            var faculty = await _facultySvc.FindByCode(code);
            return Ok(FacultyParser.ModelToDTO(faculty));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }
}