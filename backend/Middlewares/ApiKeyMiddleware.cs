public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _apiKey;
    private const string ApiKeyPrefix = "Bearer ";

    public ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _apiKey = configuration.GetValue<string>("API:Key") ?? throw new ArgumentNullException("API:Key");
    }

    public async Task Invoke(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue("Authorization", out var extractedApiKey))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Authorization header is missing");
            return;
        }

        if (!extractedApiKey.ToString().StartsWith(ApiKeyPrefix))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid Authorization header format");
            return;
        }

        var token = extractedApiKey.ToString().Substring(ApiKeyPrefix.Length); // Remove the "Bearer " prefix
        if (!string.Equals(token, _apiKey))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Unauthorized client");
            return;
        }

        await _next(context);
    }
}
