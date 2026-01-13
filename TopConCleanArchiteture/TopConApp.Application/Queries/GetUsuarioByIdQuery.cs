using MediatR;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;

namespace TopConApp.Application.Queries
{
    public record GetUsuarioByIdQuery(int UsuarioId) : IRequest<Usuario?>;

    public class GetUsuarioByIdQueryHandler : IRequestHandler<GetUsuarioByIdQuery, Usuario?>
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public GetUsuarioByIdQueryHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario?> Handle(GetUsuarioByIdQuery request, CancellationToken cancellationToken)
        {
            return await _usuarioRepository.GetUsuarioByIdAsync(request.UsuarioId);
        }
    }
}