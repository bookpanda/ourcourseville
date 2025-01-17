using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

public interface ICourseService
{
    Task<Course> Create(CourseDTO courseDTO);
    Task<List<Course>> FindByFacultyCode(string facultyCode);
    Task<Course?> FindByCode(string code);
}