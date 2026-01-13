using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TopConApp.Domain.Entities;

namespace TopConApp.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> AddUsuarioAsync(Usuario usuario);
        Task<Usuario> UpdateUsuarioAsync(int usuarioId, Usuario usuario);
        Task<Usuario?> GetUsuarioByIdAsync(int usuarioId);
        Task<Usuario?> GetUsuarioByEmailAsync(string email);
    }
}
