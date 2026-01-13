using TopConApp.Domain.Entities;
using Xunit;

namespace TopConApp.Domain.Tests.Entities
{
    public class PostagemTests
    {
        [Fact]
        public void Postagem_DeveSerCriadaComPropriedadesCorretas()
        {
            // Arrange & Act
            var postagem = new Postagem
            {
                Id = 1,
                Titulo = "Teste Título",
                Conteudo = "Conteúdo de teste",
                DataCriacao = DateTime.Now,
                UsuarioId = 1,
            };

            // Assert
            Assert.Equal(1, postagem.Id);
            Assert.Equal("Teste Título", postagem.Titulo);
            Assert.Equal("Conteúdo de teste", postagem.Conteudo);
            Assert.Equal(1, postagem.UsuarioId);
            Assert.NotEqual(DateTime.MinValue, postagem.DataCriacao);
        }

        [Fact]
        public void Postagem_DevePermitirDataAtualizacaoNula()
        {
            // Arrange & Act
            var postagem = new Postagem
            {
                Titulo = "Teste",
                Conteudo = "Conteúdo",
                UsuarioId = 1,
            };

            // Assert
            Assert.Null(postagem.DataAtualizacao);
        }

        [Fact]
        public void Postagem_DevePermitirUsuarioNulo()
        {
            // Arrange & Act
            var postagem = new Postagem
            {
                Titulo = "Teste",
                Conteudo = "Conteúdo",
                UsuarioId = 1,
            };

            // Assert
            Assert.Null(postagem.Usuario);
        }
    }
}
