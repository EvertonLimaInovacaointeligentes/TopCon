using Moq;
using TopConApp.Application.Commands;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;
using Xunit;

namespace TopConApp.Application.Tests.Commands
{
    public class AddPostagemCommandHandlerTests
    {
        private readonly Mock<IPostagemRepository> _mockRepository;
        private readonly AddPostagemCommandHandler _handler;

        public AddPostagemCommandHandlerTests()
        {
            _mockRepository = new Mock<IPostagemRepository>();
            _handler = new AddPostagemCommandHandler(_mockRepository.Object);
        }

        [Fact]
        public async Task Handle_DeveAdicionarPostagemComSucesso()
        {
            // Arrange
            var postagem = new Postagem
            {
                Id = 1,
                Titulo = "Teste",
                Conteudo = "Conteúdo de teste",
                UsuarioId = 1,
                DataCriacao = DateTime.Now
            };

            var command = new AddPostagemCommand(postagem);

            _mockRepository
                .Setup(x => x.AddPostagemAsync(It.IsAny<Postagem>()))
                .ReturnsAsync(postagem);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(postagem.Id, result.Id);
            Assert.Equal(postagem.Titulo, result.Titulo);
            _mockRepository.Verify(x => x.AddPostagemAsync(postagem), Times.Once);
        }

        [Fact]
        public async Task Handle_DeveChamarRepositorioComPostagemCorreta()
        {
            // Arrange
            var postagem = new Postagem
            {
                Titulo = "Título Teste",
                Conteudo = "Conteúdo Teste",
                UsuarioId = 2
            };

            var command = new AddPostagemCommand(postagem);

            _mockRepository
                .Setup(x => x.AddPostagemAsync(It.IsAny<Postagem>()))
                .ReturnsAsync(postagem);

            // Act
            await _handler.Handle(command, CancellationToken.None);

            // Assert
            _mockRepository.Verify(x => x.AddPostagemAsync(
                It.Is<Postagem>(p => 
                    p.Titulo == "Título Teste" && 
                    p.Conteudo == "Conteúdo Teste" && 
                    p.UsuarioId == 2)), 
                Times.Once);
        }
    }
}