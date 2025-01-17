using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using backend.DTO;
using backend.Exceptions;
using backend.Parsers;

namespace backend.Controllers;


[Route("record")]
[ApiController]
public class RecordController : ControllerBase
{
    private readonly string _webUrl;
    private readonly IRecordService _recordSvc;
    private readonly ILogger<RecordController> _log;

    public RecordController(IRecordService recordSvc, ILogger<RecordController> log, IConfiguration configuration)
    {
        _webUrl = configuration.GetValue<string>("Web:Url") ?? throw new ArgumentNullException("Web:Url");
        _recordSvc = recordSvc;
        _log = log;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRecord([FromBody] CreateRecordDTO recordDTO)
    {
        try
        {
            var record = await _recordSvc.Create(recordDTO);
            return Ok(RecordParser.ModelToCreatedDTO(record, recordDTO, _webUrl));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> FindOneRecord(string id)
    {
        try
        {
            var record = await _recordSvc.FindOne(id);
            if (record == null)
            {
                return NotFound(new JSONResponse($"No record with id {id} found"));
            }

            return Ok(RecordParser.ModelToDTO(record));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }

    [HttpGet("assignment/{asgmCode}")]
    public async Task<IActionResult> FindRecordByAssignmentID(string asgmCode)
    {
        try
        {
            var records = await _recordSvc.FindByAssignmentCode(asgmCode);

            return Ok(RecordParser.ModelToDTOList(records));
        }
        catch (ServiceException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.ToJSON());
        }
    }
}