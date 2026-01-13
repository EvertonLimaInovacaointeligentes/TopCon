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
    public record GetAllPostagemsQuery() : IRequest<IEnumerable<Postagem>>;


    public class GetAllPostagemsQueryHandler : IRequestHandler<GetAllPostagemsQuery, IEnumerable<Postagem>>
    {
        private readonly IPostagemRepository _postagemRepository;

        public GetAllPostagemsQueryHandler(IPostagemRepository postagemRepository)
        {
            _postagemRepository = postagemRepository;
        }

        public async Task<IEnumerable<Postagem>> Handle(GetAllPostagemsQuery request, CancellationToken cancellationToken)
        {
            return await _postagemRepository.GetPostagens();
        }
    }
}
