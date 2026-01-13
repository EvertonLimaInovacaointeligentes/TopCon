using MediatR;
using TopConApp.Domain.Interfaces;

namespace TopConApp.Application.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResult>
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginCommandHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<LoginResult> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            try
            {
                // Buscar usuário por email
                var usuario = await _usuarioRepository.GetUsuarioByEmailAsync(request.Email);
                
                if (usuario == null)
                {
                    return new LoginResult
                    {
                        Success = false,
                        Message = "Email não encontrado"
                    };
                }

                // Verificar senha (em produção, use hash)
                if (usuario.SenhaHash != request.Senha) // Simplificado - use hash em produção
                {
                    return new LoginResult
                    {
                        Success = false,
                        Message = "Senha incorreta"
                    };
                }

                return new LoginResult
                {
                    Success = true,
                    Message = "Login realizado com sucesso",
                    Usuario = usuario,
                    Token = "fake-jwt-token" // Implementar JWT real
                };
            }
            catch (Exception ex)
            {
                return new LoginResult
                {
                    Success = false,
                    Message = $"Erro interno: {ex.Message}"
                };
            }
        }
    }
}