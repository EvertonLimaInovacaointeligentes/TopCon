using Microsoft.EntityFrameworkCore;
using TopConApp.Domain.Entities;
using TopConApp.Infrastructure.Data;
using TopConApp.Infrastructure.Repositories;
using Xunit;

namespace TopConApp.Infrastructure.Tests.Repositories
{
    public class PostagemRepositoryTests : IDisposable
    {
        private readonly AppDBContext _context;
        private readonly PostagemRepository _repository;

        public PostagemRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDBContext(options);
            _repository = new PostagemRepository(_context);
        }

        [Fact]
        public async Task AddPostagemAsync_DeveAdicionarPostagemComSucesso()
        {
            // Arrange
            var postagem = new Postagem
            {
                Titulo = "Teste Título",
                Conteudo = "Conteúdo de teste",
                UsuarioId = 1,
                DataCriacao = DateTime.Now
            };

            // Act
            var result = await _repository.AddPostagemAsync(postagem);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Id > 0);
            Assert.Equal("Teste Título", result.Titulo);

            var postagemNoBanco = await _context.Postagens.FindAsync(result.Id);
            Assert.NotNull(postagemNoBanco);
            Assert.Equal("Teste Título", postagemNoBanco.Titulo);
        }

        [Fact]
        public async Task GetPostagens_DeveRetornarTodasAsPostagens()
        {
            // Arrange
            var postagens = new List<Postagem>
            {
                new Postagem { Titulo = "Post 1", Conteudo = "Conteúdo 1", UsuarioId = 1, DataCriacao = DateTime.Now },
                new Postagem { Titulo = "Post 2", Conteudo = "Conteúdo 2", UsuarioId = 2, DataCriacao = DateTime.Now }
            };

            await _context.Postagens.AddRangeAsync(postagens);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetPostagens();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetPostagensByIdAsync_DeveRetornarPostagemCorreta()
        {
            // Arrange
            var postagem = new Postagem
            {
                Titulo = "Teste",
                Conteudo = "Conteúdo",
                UsuarioId = 1,
                DataCriacao = DateTime.Now
            };

            await _context.Postagens.AddAsync(postagem);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetPostagensByIdAsync(postagem.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(postagem.Id, result.Id);
            Assert.Equal("Teste", result.Titulo);
        }

        [Fact]
        public async Task UpdatePostagemAsync_DeveAtualizarPostagemExistente()
        {
            // Arrange
            var postagem = new Postagem
            {
                Titulo = "Título Original",
                Conteudo = "Conteúdo Original",
                UsuarioId = 1,
                DataCriacao = DateTime.Now
            };

            await _context.Postagens.AddAsync(postagem);
            await _context.SaveChangesAsync();

            var postagemAtualizada = new Postagem
            {
                Titulo = "Título Atualizado",
                Conteudo = "Conteúdo Atualizado",
                UsuarioId = 1
            };

            // Act
            var result = await _repository.UpdatePostagemAsync(postagem.Id, postagemAtualizada);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Título Atualizado", result.Titulo);
            Assert.Equal("Conteúdo Atualizado", result.Conteudo);
            Assert.NotNull(result.DataAtualizacao);
        }

        [Fact]
        public async Task DeletePostagemAsync_DeveRemoverPostagemExistente()
        {
            // Arrange
            var postagem = new Postagem
            {
                Titulo = "Para Deletar",
                Conteudo = "Conteúdo",
                UsuarioId = 1,
                DataCriacao = DateTime.Now
            };

            await _context.Postagens.AddAsync(postagem);
            await _context.SaveChangesAsync();

            var postagemParaDeletar = new Postagem { UsuarioId = 1 };

            // Act
            var result = await _repository.DeletePostagemAsync(postagem.Id, postagemParaDeletar);

            // Assert
            Assert.True(result);

            var postagemNoBanco = await _context.Postagens.FindAsync(postagem.Id);
            Assert.Null(postagemNoBanco);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}