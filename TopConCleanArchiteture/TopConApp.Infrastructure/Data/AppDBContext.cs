using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TopConApp.Domain.Entities;

namespace TopConApp.Infrastructure.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options) { }

        // O "= null!" evita o aviso de propriedade não anulável (CS8618)
        public DbSet<Postagem> Postagens { get; set; } = null!;
        public DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.NomeUsuario).HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.SenhaHash).IsRequired();
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20).HasDefaultValue("user");
                entity.Property(e => e.DataCadastro).IsRequired();
                entity.Property(e => e.DataAtualizacao);
            });
            
            modelBuilder.Entity<Postagem>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Titulo).IsRequired().HasMaxLength(200);

                entity.Property(e => e.Conteudo).IsRequired();

                entity.Property(e => e.UsuarioId).IsRequired();

                entity.Property(e => e.DataCriacao).IsRequired();

                // Configurando relacionamento com Usuario de forma mais explícita
                entity.HasOne(p => p.Usuario)
                    .WithMany()
                    .HasForeignKey(p => p.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
