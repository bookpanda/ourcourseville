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
        services.Configure<TTLConfig>(config.GetSection(TTLConfig.TTL));

        return services;
    }
    public static IServiceCollection AddMyDependencyGroup(this IServiceCollection services)
    {
        services.AddSingleton(FirebaseApp.Create());
        services.AddSingleton<Firestore>();
        services.AddScoped<IFacultyService, FacultyService>();
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<IAssignmentService, AssignmentService>();
        services.AddScoped<IRecordService, RecordService>();

        services.AddScoped<FirestoreSeeder>();

        return services;
    }
}
