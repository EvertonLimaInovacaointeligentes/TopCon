using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;

namespace TopConApp.Application.Queries
{
    public record GetPostagensByIdQuery(int postagemId) : IRequest<Postagem?>;


    public class GetPostagensByIdQueryHandler : IRequestHandler<GetPostagensByIdQuery, Postagem?>
    {
        private readonly IPostagemRepository _postagemRepository;

        public GetPostagensByIdQueryHandler(IPostagemRepository postagemRepository)
        {
            _postagemRepository = postagemRepository;
        }

        public async Task<Postagem?> Handle(GetPostagensByIdQuery request, CancellationToken cancellationToken)
        {
            return await _postagemRepository.GetPostagensByIdAsync(request.postagemId);
        }
    }
}
