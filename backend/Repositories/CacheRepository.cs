using backend.Repositories.Interfaces;
using System.Text.Json;
using StackExchange.Redis;

namespace backend.Repositories;

public class CacheRepository : ICacheRepository
{
    private readonly IDatabase _cache;

    public CacheRepository(IConnectionMultiplexer connectionMultiplexer)
    {
        _cache = connectionMultiplexer.GetDatabase();
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan expiration)
    {
        var jsonValue = JsonSerializer.Serialize(value);
        await _cache.StringSetAsync(key, jsonValue, expiration);
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var jsonValue = await _cache.StringGetAsync(key);
        if (jsonValue.IsNull)
        {
            return default;
        }

        return JsonSerializer.Deserialize<T>(jsonValue!);
    }

    public async Task RemoveAsync(string key)
    {
        await _cache.KeyDeleteAsync(key);
    }
}