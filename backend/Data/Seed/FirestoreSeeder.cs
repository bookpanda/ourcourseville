using System.Text.Json;
using backend.DTO;
using backend.Services.Interfaces;

public class FirestoreSeeder
{
    private readonly IFacultyService _facultySvc;

    public FirestoreSeeder(IFacultyService facultySvc)
    {
        _facultySvc = facultySvc;
    }

    public async Task SeedFaculties()
    {
        var jsonData = await File.ReadAllTextAsync("Data/Seed/faculties.json");
        var faculties = JsonSerializer.Deserialize<List<FacultyDTO>>(jsonData);
        if (faculties == null) return;

        foreach (var faculty in faculties)
        {
            if (faculty == null) continue;

            try
            {
                var found = await _facultySvc.FindByCode(faculty.Code);
                if (found != null) continue;
            }
            catch
            {
                Console.WriteLine($"Faculty with code: {faculty.Code} not found");
            }

            try
            {
                await _facultySvc.Create(faculty);
                Console.WriteLine($"Added faculty with code: {faculty.Code}");
            }
            catch
            {
                Console.WriteLine($"Error creating faculty with code: {faculty.Code}");
            }
        }
    }
}
