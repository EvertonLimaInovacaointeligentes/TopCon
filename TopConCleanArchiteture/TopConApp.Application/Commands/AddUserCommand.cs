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
    public record AddUserCommand(Usuario usuario) : IRequest<Usuario>;


    public class AddUserCommandHandler : IRequestHandler<AddUserCommand, Usuario>
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public AddUserCommandHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            // Ensure dates are in UTC format for PostgreSQL
            var usuario = request.usuario;
            usuario.DataCadastro = DateTime.SpecifyKind(usuario.DataCadastro, DateTimeKind.Utc);
            if (usuario.DataAtualizacao.HasValue)
            {
                usuario.DataAtualizacao = DateTime.SpecifyKind(usuario.DataAtualizacao.Value, DateTimeKind.Utc);
            }
            
            return await _usuarioRepository.AddUsuarioAsync(usuario);
        }
    }
}
