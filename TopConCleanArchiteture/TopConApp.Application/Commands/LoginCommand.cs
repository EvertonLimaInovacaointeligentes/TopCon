using MediatR;
using TopConApp.Domain.Entities;

namespace TopConApp.Application.Commands
{
    public record LoginCommand(string Email, string Senha) : IRequest<LoginResult>;

    public class LoginResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public Usuario? Usuario { get; set; }
        public string? Token { get; set; } // Para JWT no futuro
    }
}