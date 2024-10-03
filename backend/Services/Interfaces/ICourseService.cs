using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface ICourseService
{
    Task<Course> Create(CourseDTO courseDTO);
    Task<List<Course>> FindByFacultyID(string id);
    Task<Course> FindByCode(string code);
}