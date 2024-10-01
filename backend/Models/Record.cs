using System.Collections.Generic;

namespace backend.Models;

public class Record
{
    public required string CourseCode { get; set; }
    public required string CourseID { get; set; }
    public required string Course { get; set; }
    public required string AssignmentID { get; set; }
    public required string Assignment { get; set; }
    public required List<Problem> Problems { get; set; }
}

public class Problem
{
    public required string Question { get; set; }
    public required string Answer { get; set; }
}