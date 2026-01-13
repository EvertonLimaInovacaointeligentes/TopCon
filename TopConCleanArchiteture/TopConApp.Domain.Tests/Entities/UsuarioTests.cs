using TopConApp.Domain.Entities;
using Xunit;

namespace TopConApp.Domain.Tests.Entities
{
    public class UsuarioTests
    {
        [Fact]
        public void Usuario_DeveSerCriadoComPropriedadesCorretas()
        {
            // Arrange & Act
            var usuario = new Usuario
            {
                Id = 1,
                NomeUsuario = "testuser",
                Email = "test@example.com",
                SenhaHash = "hashedpassword"
            };

            // Assert
            Assert.Equal(1, usuario.Id);
            Assert.Equal("testuser", usuario.NomeUsuario);
            Assert.Equal("test@example.com", usuario.Email);
            Assert.Equal("hashedpassword", usuario.SenhaHash);
        }

        [Fact]
        public void Usuario_DeveDefinirDataCadastroAutomaticamente()
        {
            // Arrange & Act
            var usuario = new Usuario();

            // Assert
            Assert.True(usuario.DataCadastro <= DateTime.UtcNow);
            Assert.True(usuario.DataCadastro > DateTime.UtcNow.AddMinutes(-1));
        }

        [Fact]
        public void Usuario_DevePermitirDataAtualizacaoNula()
        {
            // Arrange & Act
            var usuario = new Usuario
            {
                NomeUsuario = "test",
                Email = "test@example.com",
                SenhaHash = "hash"
            };

            // Assert
            Assert.Null(usuario.DataAtualizacao);
        }
    }
}