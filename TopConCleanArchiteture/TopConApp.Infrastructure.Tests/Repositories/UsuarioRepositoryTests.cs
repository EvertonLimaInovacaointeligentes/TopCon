using Microsoft.EntityFrameworkCore;
using TopConApp.Domain.Entities;
using TopConApp.Infrastructure.Data;
using TopConApp.Infrastructure.Repositories;
using Xunit;

namespace TopConApp.Infrastructure.Tests.Repositories
{
    public class UsuarioRepositoryTests : IDisposable
    {
        private readonly AppDBContext _context;
        private readonly UsuarioRepository _repository;

        public UsuarioRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDBContext(options);
            _repository = new UsuarioRepository(_context);
        }

        [Fact]
        public async Task AddUsuarioAsync_DeveAdicionarUsuarioComSucesso()
        {
            // Arrange
            var usuario = new Usuario
            {
                NomeUsuario = "testuser",
                Email = "test@example.com",
                SenhaHash = "hashedpassword"
            };

            // Act
            var result = await _repository.AddUsuarioAsync(usuario);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Id > 0);
            Assert.Equal("testuser", result.NomeUsuario);
            Assert.Equal("test@example.com", result.Email);

            var usuarioNoBanco = await _context.Usuarios.FindAsync(result.Id);
            Assert.NotNull(usuarioNoBanco);
            Assert.Equal("testuser", usuarioNoBanco.NomeUsuario);
        }

        [Fact]
        public async Task UpdateUsuarioAsync_DeveAtualizarUsuarioExistente()
        {
            // Arrange
            var usuario = new Usuario
            {
                NomeUsuario = "originaluser",
                Email = "original@example.com",
                SenhaHash = "originalhash"
            };

            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();

            var usuarioAtualizado = new Usuario
            {
                NomeUsuario = "updateduser",
                Email = "updated@example.com",
                SenhaHash = "updatedhash"
            };

            // Act
            var result = await _repository.UpdateUsuarioAsync(usuario.Id, usuarioAtualizado);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("updateduser", result.NomeUsuario);
            Assert.Equal("updated@example.com", result.Email);
            Assert.Equal("updatedhash", result.SenhaHash);
        }

        [Fact]
        public async Task UpdateUsuarioAsync_DeveRetornarUsuarioOriginalSeNaoEncontrado()
        {
            // Arrange
            var usuarioAtualizado = new Usuario
            {
                NomeUsuario = "newuser",
                Email = "new@example.com",
                SenhaHash = "newhash"
            };

            // Act
            var result = await _repository.UpdateUsuarioAsync(999, usuarioAtualizado);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(usuarioAtualizado, result);
        }

        [Fact]
        public async Task GetUsuarioByIdAsync_DeveRetornarUsuarioExistente()
        {
            // Arrange
            var usuario = new Usuario
            {
                NomeUsuario = "testuser",
                Email = "test@example.com",
                SenhaHash = "hashedpassword"
            };

            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetUsuarioByIdAsync(usuario.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(usuario.Id, result.Id);
            Assert.Equal("testuser", result.NomeUsuario);
        }

        [Fact]
        public async Task GetUsuarioByIdAsync_DeveRetornarNullSeNaoEncontrado()
        {
            // Act
            var result = await _repository.GetUsuarioByIdAsync(999);

            // Assert
            Assert.Null(result);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}