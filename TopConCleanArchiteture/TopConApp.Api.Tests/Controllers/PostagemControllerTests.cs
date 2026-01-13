using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TopConApp.Api.Controllers;
using TopConApp.Application.Commands;
using TopConApp.Domain.Entities;
using Xunit;

namespace TopConApp.Api.Tests.Controllers
{
    public class PostagemControllerTests
    {
        private readonly Mock<ISender> _mockSender;
        private readonly PostagemController _controller;

        public PostagemControllerTests()
        {
            _mockSender = new Mock<ISender>();
            _controller = new PostagemController(_mockSender.Object);
        }

        [Fact]
        public async Task AddPostagemAsync_DeveRetornarOkComPostagem()
        {
            // Arrange
            var postagem = new Postagem
            {
                Id = 1,
                Titulo = "Teste Título",
                Conteudo = "Conteúdo de teste",
                UsuarioId = 1,
                DataCriacao = DateTime.Now
            };

            _mockSender
                .Setup(x => x.Send(It.IsAny<AddPostagemCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(postagem);

            // Act
            var result = await _controller.AddPostagemAsync(postagem);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPostagem = Assert.IsType<Postagem>(okResult.Value);
            Assert.Equal(postagem.Id, returnedPostagem.Id);
            Assert.Equal(postagem.Titulo, returnedPostagem.Titulo);
        }

        [Fact]
        public async Task AddPostagemAsync_DeveChamarSenderComComandoCorreto()
        {
            // Arrange
            var postagem = new Postagem
            {
                Titulo = "Nova Postagem",
                Conteudo = "Novo Conteúdo",
                UsuarioId = 2
            };

            _mockSender
                .Setup(x => x.Send(It.IsAny<AddPostagemCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(postagem);

            // Act
            await _controller.AddPostagemAsync(postagem);

            // Assert
            _mockSender.Verify(x => x.Send(
                It.Is<AddPostagemCommand>(cmd => cmd.postagem == postagem),
                It.IsAny<CancellationToken>()), 
                Times.Once);
        }
    }
}