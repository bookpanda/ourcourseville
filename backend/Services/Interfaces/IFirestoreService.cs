using backend.Models;

namespace backend.Services.Interfaces;

public interface IFirestoreService
{
    Task AddDocumentAsync();
    Task GetDocumentAsync(string documentId);
}