namespace backend.Config;

public class RecordConfig
{
    public const string Record = "Record";
    public required string DB { get; set; }
    public required string Collection { get; set; }
}
