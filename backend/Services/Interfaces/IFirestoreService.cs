using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IFirestoreService
{
    Task AddDocumentAsync(RecordDTO recordDTO);
    Task<List<Record>> GetDocumentAsync(string documentId);
}