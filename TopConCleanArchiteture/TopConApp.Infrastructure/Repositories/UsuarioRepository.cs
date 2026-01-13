using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TopConApp.Domain.Entities;
using TopConApp.Domain.Interfaces;
using TopConApp.Infrastructure.Data;

namespace TopConApp.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        AppDBContext _dbContext;
        public UsuarioRepository(AppDBContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<Usuario> AddUsuarioAsync(Usuario usuario)
        {
           
            _dbContext.Usuarios.Add(usuario);         
            await _dbContext.SaveChangesAsync();
            return usuario;
        }
        public async Task<bool> GetUsuarioExist(Login usuario)
        {
            var existUsuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email == usuario.Email );
            if(existUsuario is not null)
            {
                return true;
            }
            return false;
        }
        public async Task<Usuario?> GetUsuarioByIdAsync(int usuarioId)
        {
            return await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == usuarioId);
        }

        public async Task<Usuario?> GetUsuarioByEmailAsync(string email)
        {
            return await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<Usuario> UpdateUsuarioAsync(int usuarioId, Usuario usuario)
        {
            var usuarioEncontrado = await _dbContext.Usuarios.FirstOrDefaultAsync<Usuario>(x => x.Id == usuarioId);

            if (usuarioEncontrado is not null)
            {
                usuarioEncontrado.NomeUsuario = usuario.NomeUsuario;
                usuarioEncontrado.Email = usuario.Email;
                usuarioEncontrado.SenhaHash = usuario.SenhaHash;
                usuarioEncontrado.Role = usuario.Role; // ← Campo Role adicionado
                usuarioEncontrado.DataAtualizacao = DateTime.UtcNow; // ← Corrigido para usar usuarioEncontrado e UTC
                _dbContext.Usuarios.Update(usuarioEncontrado);
                await _dbContext.SaveChangesAsync();
                return usuarioEncontrado;
            }

            return usuario;
        }
    }
}
