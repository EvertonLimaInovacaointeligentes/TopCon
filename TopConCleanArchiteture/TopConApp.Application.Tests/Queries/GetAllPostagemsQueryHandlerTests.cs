using Moq;
using TopConApp.Application.Queries;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;
using Xunit;

namespace TopConApp.Application.Tests.Queries
{
    public class GetAllPostagemsQueryHandlerTests
    {
        private readonly Mock<IPostagemRepository> _mockRepository;
        private readonly GetAllPostagemsQueryHandler _handler;

        public GetAllPostagemsQueryHandlerTests()
        {
            _mockRepository = new Mock<IPostagemRepository>();
            _handler = new GetAllPostagemsQueryHandler(_mockRepository.Object);
        }

        [Fact]
        public async Task Handle_DeveRetornarTodasAsPostagens()
        {
            // Arrange
            var postagens = new List<Postagem>
            {
                new Postagem { Id = 1, Titulo = "Post 1", Conteudo = "Conteúdo 1", UsuarioId = 1 },
                new Postagem { Id = 2, Titulo = "Post 2", Conteudo = "Conteúdo 2", UsuarioId = 2 }
            };

            var query = new GetAllPostagemsQuery();

            _mockRepository
                .Setup(x => x.GetPostagens())
                .ReturnsAsync(postagens);

            // Act
            var result = await _handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
            Assert.Contains(result, p => p.Titulo == "Post 1");
            Assert.Contains(result, p => p.Titulo == "Post 2");
            _mockRepository.Verify(x => x.GetPostagens(), Times.Once);
        }

        [Fact]
        public async Task Handle_DeveRetornarListaVaziaQuandoNaoHouverPostagens()
        {
            // Arrange
            var postagens = new List<Postagem>();
            var query = new GetAllPostagemsQuery();

            _mockRepository
                .Setup(x => x.GetPostagens())
                .ReturnsAsync(postagens);

            // Act
            var result = await _handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
            _mockRepository.Verify(x => x.GetPostagens(), Times.Once);
        }
    }
}