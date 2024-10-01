using backend.Services.Interfaces;
using backend.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class MyConfigServiceCollectionExtensions
{
    public static IServiceCollection AddMyDependencyGroup(this IServiceCollection services)
    {
        services.AddScoped<IFirestoreService, FirestoreService>();

        return services;
    }
}
