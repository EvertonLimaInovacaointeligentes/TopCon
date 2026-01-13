using Microsoft.Extensions.Configuration;
using TopConApp.Application;
using TopConApp.Infrastructure;

namespace TopConApp.Api
{
    public static class DependencyInjector
    {
        public static IServiceCollection AddApiID(this IServiceCollection services, IConfiguration configuration)
        {           
            services.AddApplicationID()
                .AddInfrastructureID(configuration);
            return services;
        }
    }
}
