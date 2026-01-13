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
    public record DeletePostagemCommand(int postagemId) : IRequest<bool>;


    public class DeleteUserCommandHandler : IRequestHandler<DeletePostagemCommand, bool>
    {
        private readonly IPostagemRepository _postagemRepository;

        public DeleteUserCommandHandler(IPostagemRepository postagemRepository)
        {
            _postagemRepository = postagemRepository;
        }

        public async Task<bool> Handle(DeletePostagemCommand request, CancellationToken cancellationToken)
        {
            return await _postagemRepository.DeletePostagemAsync(request.postagemId);
        }
    }
}
