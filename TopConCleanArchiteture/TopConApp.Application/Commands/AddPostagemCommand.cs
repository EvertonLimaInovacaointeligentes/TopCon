using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;

namespace TopConApp.Application.Commands
{
    public record AddPostagemCommand(Postagem postagem) : IRequest<Postagem>;


    public class AddPostagemCommandHandler: IRequestHandler<AddPostagemCommand,Postagem>
    {
        private readonly IPostagemRepository _postagemRepository;

        public AddPostagemCommandHandler(IPostagemRepository postagemRepository)
        {
            _postagemRepository = postagemRepository;
        }

        public async Task<Postagem> Handle(AddPostagemCommand request, CancellationToken cancellationToken)
        {
            // Ensure dates are in UTC format for PostgreSQL
            var postagem = request.postagem;
            postagem.DataCriacao = DateTime.SpecifyKind(postagem.DataCriacao, DateTimeKind.Utc);
            if (postagem.DataAtualizacao.HasValue)
            {
                postagem.DataAtualizacao = DateTime.SpecifyKind(postagem.DataAtualizacao.Value, DateTimeKind.Utc);
            }
            
            return await _postagemRepository.AddPostagemAsync(postagem);
        }
    }
}
