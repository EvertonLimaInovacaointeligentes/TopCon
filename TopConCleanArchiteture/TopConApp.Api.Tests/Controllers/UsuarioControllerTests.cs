using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TopConApp.Api.Controllers;
using TopConApp.Application.Commands;
using TopConApp.Domain.Entities;
using Xunit;

namespace TopConApp.Api.Tests.Controllers
{
    public class UsuarioControllerTests
    {
        private readonly Mock<ISender> _mockSender;
        private readonly UsuarioController _controller;

        public UsuarioControllerTests()
        {
            _mockSender = new Mock<ISender>();
            _controller = new UsuarioController(_mockSender.Object);
        }

        [Fact]
        public async Task AddUsuarioAsync_DeveRetornarOkComUsuario()
        {
            // Arrange
            var usuario = new Usuario
            {
                Id = 1,
                NomeUsuario = "testuser",
                Email = "test@example.com",
                SenhaHash = "hashedpassword"
            };

            _mockSender
                .Setup(x => x.Send(It.IsAny<AddUserCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(usuario);

            // Act
            var result = await _controller.addUsuarioAsync(usuario);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedUsuario = Assert.IsType<Usuario>(okResult.Value);
            Assert.Equal(usuario.Id, returnedUsuario.Id);
            Assert.Equal(usuario.NomeUsuario, returnedUsuario.NomeUsuario);
        }

        [Fact]
        public async Task AddUsuarioAsync_DeveChamarSenderComComandoCorreto()
        {
            // Arrange
            var usuario = new Usuario
            {
                NomeUsuario = "newuser",
                Email = "new@example.com",
                SenhaHash = "newhash"
            };

            _mockSender
                .Setup(x => x.Send(It.IsAny<AddUserCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(usuario);

            // Act
            await _controller.addUsuarioAsync(usuario);

            // Assert
            _mockSender.Verify(x => x.Send(
                It.Is<AddUserCommand>(cmd => cmd.usuario == usuario),
                It.IsAny<CancellationToken>()), 
                Times.Once);
        }
    }
}