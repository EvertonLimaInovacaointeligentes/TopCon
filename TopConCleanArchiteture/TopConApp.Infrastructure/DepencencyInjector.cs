using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TopConApp.Domain.Interfaces;
using TopConApp.Infrastructure.Data;
using TopConApp.Infrastructure.Repositories;

namespace TopConApp.Infrastructure
{
    public static class DepencencyInjector
    {
        public static IServiceCollection AddInfrastructureID(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDBContext>(
                options =>
                {
                    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
                }
                );

            services.AddScoped<IPostagemRepository, PostagemRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            return services;
        }
    }
}
