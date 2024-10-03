using backend.Services.Interfaces;
using backend.Services;
using FirebaseAdmin;
using backend.Config;
using backend.Data;

namespace Microsoft.Extensions.DependencyInjection;

public static class MyConfigServiceCollectionExtensions
{
    public static IServiceCollection AddConfig(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<FirestoreConfig>(config.GetSection(FirestoreConfig.Firestore));

        return services;
    }
    public static IServiceCollection AddMyDependencyGroup(this IServiceCollection services)
    {
        services.AddSingleton(FirebaseApp.Create());
        services.AddSingleton<Firestore>();
        services.AddScoped<IRecordService, RecordService>();

        return services;
    }
}
