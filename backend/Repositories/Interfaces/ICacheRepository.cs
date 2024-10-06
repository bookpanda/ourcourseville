namespace backend.Repositories.Interfaces;

public interface ICacheRepository
{
    Task SetAsync<T>(string key, T value, TimeSpan expiration);
    Task<T?> GetAsync<T>(string key);
    Task RemoveAsync(string key);
}