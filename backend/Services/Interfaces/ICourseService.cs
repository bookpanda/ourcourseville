using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface ICourseService
{
    Task<Record> Create(CourseDTO courseDTO);
    Task<List<Record>> FindByFacultyID(string id);
    Task<Record> FindByCode(string code);
}