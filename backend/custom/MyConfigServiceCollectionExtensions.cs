using backend.Services.Interfaces;
using backend.Services;
using FirebaseAdmin;
using backend.Config;

namespace Microsoft.Extensions.DependencyInjection;

public static class MyConfigServiceCollectionExtensions
{
    public static IServiceCollection AddConfig(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<RecordConfig>(config.GetSection(RecordConfig.Record));

        return services;
    }
    public static IServiceCollection AddMyDependencyGroup(this IServiceCollection services)
    {
        services.AddSingleton(FirebaseApp.Create());
        services.AddScoped<IRecordService, RecordService>();

        return services;
    }
}
