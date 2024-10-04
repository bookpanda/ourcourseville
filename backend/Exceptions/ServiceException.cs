using System.Net;
using System.Text.Json.Serialization;

namespace backend.Exceptions;

public class ServiceException : Exception
{
    [JsonPropertyName("status_code")]
    public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.InternalServerError;

    public ServiceException(string message, HttpStatusCode statusCode) : base(message)
    {
        StatusCode = statusCode;
    }

    public ServiceException(string message, HttpStatusCode statusCode, Exception innerException) : base(message, innerException)
    {
        StatusCode = statusCode;
    }

    public JSONResponse ToJSON()
    {
        return new JSONResponse(Message);
    }
}

public class JSONResponse
{
    [JsonPropertyName("message")]
    public string Message { get; set; }

    public JSONResponse(string message)
    {
        Message = message;
    }
}