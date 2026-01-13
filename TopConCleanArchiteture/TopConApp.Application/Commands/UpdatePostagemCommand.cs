using MediatR;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;

namespace TopConApp.Application.Commands
{
    public record UpdatePostagemCommand(int PostagemId, Postagem Postagem) : IRequest<Postagem>;

    public class UpdatePostagemCommandHandler : IRequestHandler<UpdatePostagemCommand, Postagem>
    {
        private readonly IPostagemRepository _postagemRepository;

        public UpdatePostagemCommandHandler(IPostagemRepository postagemRepository)
        {
            _postagemRepository = postagemRepository;
        }

        public async Task<Postagem> Handle(UpdatePostagemCommand request, CancellationToken cancellationToken)
        {
            // Ensure dates are in UTC format for PostgreSQL
            var postagem = request.Postagem;
            postagem.Id = request.PostagemId; // Garantir que o ID está correto
            
            if (postagem.DataAtualizacao.HasValue)
            {
                postagem.DataAtualizacao = DateTime.SpecifyKind(postagem.DataAtualizacao.Value, DateTimeKind.Utc);
            }
            else
            {
                postagem.DataAtualizacao = DateTime.UtcNow;
            }
            
            return await _postagemRepository.UpdatePostagemAsync(request.PostagemId, postagem);
        }
    }
}