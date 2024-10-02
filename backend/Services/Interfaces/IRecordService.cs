using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IRecordService
{
    Task<Record> Create(RecordDTO recordDTO);
    Task<Record> FindOne(string id);
    Task<List<Record>> Find();
}