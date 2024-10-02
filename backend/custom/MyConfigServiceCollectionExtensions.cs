using backend.Services.Interfaces;
using backend.Services;
using FirebaseAdmin;

namespace Microsoft.Extensions.DependencyInjection;

public static class MyConfigServiceCollectionExtensions
{
    public static IServiceCollection AddMyDependencyGroup(this IServiceCollection services)
    {
        services.AddSingleton(FirebaseApp.Create());
        services.AddScoped<IFirestoreService, FirestoreService>();

        return services;
    }
}
