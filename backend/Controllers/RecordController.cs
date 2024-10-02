using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;
using backend.Exceptions;

namespace backend.Controllers;


[Route("record")]
[ApiController]
public class RecordController : ControllerBase
{
    private readonly IRecordService _recordSvc;
    private readonly ILogger<RecordController> _log;

    public RecordController(IRecordService recordSvc, ILogger<RecordController> log)
    {
        _recordSvc = recordSvc;
        _log = log;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRecord([FromBody] RecordDTO recordDTO)
    {
        try
        {
            await _recordSvc.Create(recordDTO);
            return Ok();
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> FindOneRecord(string id)
    {
        try
        {
            var record = await _recordSvc.FindOne(id);
            return Ok(record);
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }
}