using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IRecordService
{
    Task<Record> Create(CreateRecordDTO recordDTO);
    Task<Record?> FindOne(string id);
    Task<List<Record>> FindByAssignmentID(string asgmID);
    Task<List<Record>> FindByCourseCode(string courseCode);
}