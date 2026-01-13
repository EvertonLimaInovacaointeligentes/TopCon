using Moq;
using TopConApp.Application.Commands;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;
using Xunit;

namespace TopConApp.Application.Tests.Commands
{
    public class AddUserCommandHandlerTests
    {
        private readonly Mock<IUsuarioRepository> _mockRepository;
        private readonly AddUserCommandHandler _handler;

        public AddUserCommandHandlerTests()
        {
            _mockRepository = new Mock<IUsuarioRepository>();
            _handler = new AddUserCommandHandler(_mockRepository.Object);
        }

        [Fact]
        public async Task Handle_DeveAdicionarUsuarioComSucesso()
        {
            // Arrange
            var usuario = new Usuario
            {
                Id = 1,
                NomeUsuario = "testuser",
                Email = "test@example.com",
                SenhaHash = "hashedpassword"
            };

            var command = new AddUserCommand(usuario);

            _mockRepository
                .Setup(x => x.AddUsuarioAsync(It.IsAny<Usuario>()))
                .ReturnsAsync(usuario);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(usuario.Id, result.Id);
            Assert.Equal(usuario.NomeUsuario, result.NomeUsuario);
            Assert.Equal(usuario.Email, result.Email);
            _mockRepository.Verify(x => x.AddUsuarioAsync(usuario), Times.Once);
        }

        [Fact]
        public async Task Handle_DeveChamarRepositorioComUsuarioCorreto()
        {
            // Arrange
            var usuario = new Usuario
            {
                NomeUsuario = "novouser",
                Email = "novo@example.com",
                SenhaHash = "novohash"
            };

            var command = new AddUserCommand(usuario);

            _mockRepository
                .Setup(x => x.AddUsuarioAsync(It.IsAny<Usuario>()))
                .ReturnsAsync(usuario);

            // Act
            await _handler.Handle(command, CancellationToken.None);

            // Assert
            _mockRepository.Verify(x => x.AddUsuarioAsync(
                It.Is<Usuario>(u => 
                    u.NomeUsuario == "novouser" && 
                    u.Email == "novo@example.com" && 
                    u.SenhaHash == "novohash")), 
                Times.Once);
        }
    }
}