using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IFacultyService
{
    Task<Faculty> Create(FacultyDTO facultyDTO);
    Task<List<Faculty>> FindAll();
    Task<Faculty?> FindByCode(string code);
}