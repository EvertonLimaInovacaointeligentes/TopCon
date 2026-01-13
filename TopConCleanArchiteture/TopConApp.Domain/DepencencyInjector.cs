using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

namespace TopConApp.Domain
{
    public static class DepencencyInjector
    {
        public static IServiceCollection AddDomainID(this IServiceCollection service)
        {   
            //service.Configure
            return service;
        }
    }
}
