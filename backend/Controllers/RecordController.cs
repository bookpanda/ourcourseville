using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;
using backend.Exceptions;

namespace backend.Controllers;


[Route("record")]
[ApiController]
public class RecordController : ControllerBase
{
    private readonly IFirestoreService _fsSvc;
    private readonly ILogger<RecordController> _log;

    public RecordController(IFirestoreService fsSvc, ILogger<RecordController> log)
    {
        _fsSvc = fsSvc;
        _log = log;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRecord([FromBody] RecordDTO recordDTO)
    {
        try
        {
            await _fsSvc.AddDocumentAsync(recordDTO);
            return Ok();
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }
}