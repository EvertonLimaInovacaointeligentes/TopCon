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
    public record UpdateUserCommand(int usuarioId, Usuario usuario) : IRequest<Usuario>;


    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Usuario>
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UpdateUserCommandHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            return await _usuarioRepository.UpdateUsuarioAsync(request.usuarioId, request.usuario);
        }
    }
}
