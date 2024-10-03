using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IFacultyService
{
    Task<Record> Create(CourseDTO courseDTO);
    Task<List<Record>> FindAll();
    Task<Record> FindByCode(string code);
}