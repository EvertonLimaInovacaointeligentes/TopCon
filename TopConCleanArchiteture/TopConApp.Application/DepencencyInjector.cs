using Microsoft.Extensions.DependencyInjection;

namespace TopConApp.Application
{
    public static class DepencencyInjector
    {
        public static IServiceCollection AddApplicationID(this IServiceCollection service)
        {
            service.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(DepencencyInjector).Assembly));
            return service;
        }
    }
}
