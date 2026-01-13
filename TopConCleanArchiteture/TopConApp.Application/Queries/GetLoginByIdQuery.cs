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
    public record GetLoginByIdQuery(Login usuario) : IRequest<bool>;


    public class GetLoginByIdQueryHandler : IRequestHandler<GetLoginByIdQuery, bool>
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public GetLoginByIdQueryHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<bool> Handle(GetLoginByIdQuery request, CancellationToken cancellationToken)
        {
            // return await _usuarioRepository.GetUsuarioExist(request.usuario);
            return false;
        }
    }
}
