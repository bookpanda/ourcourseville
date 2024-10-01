using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;

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

    [HttpPost("")]
    public async Task<IActionResult> CreateRecord([FromBody] RecordDTO recordDTO)
    {
        Console.WriteLine("Creating record...");
        _log.LogInformation("Creating record...");
        try
        {
            await _fsSvc.AddDocumentAsync(recordDTO);
            return Ok();
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error creating record");
            return StatusCode(500);
        }
    }
}