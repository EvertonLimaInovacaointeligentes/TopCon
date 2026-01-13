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
    public class PostagemRepository: IPostagemRepository
    {
        AppDBContext _dbContext;
        public PostagemRepository(AppDBContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<IEnumerable<Postagem>> GetPostagens ()
        {
            return await _dbContext.Postagens.ToListAsync();
        }

        public async Task<Postagem?> GetPostagensByIdAsync(int id)
        {
            return await _dbContext.Postagens.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Postagem> AddPostagemAsync(Postagem postagem)
        {
            // postagem.Id = postagem.Id + 1;

            try
            {
                _dbContext.Postagens.Add(postagem);
                await _dbContext.SaveChangesAsync();
                return postagem;
            }  catch (Exception)
            {
                return new Postagem() { Id = -1,Conteudo = "",DataAtualizacao = null,DataCriacao = DateTime.UtcNow,Usuario = null,UsuarioId = 0};
            }
            
        }

        public async Task<Postagem> UpdatePostagemAsync(int postagemId,Postagem postagem)
        {
            var postagemEncontrada = await _dbContext.Postagens.FirstOrDefaultAsync<Postagem>(x => x.Id == postagemId); 
            
            if(postagemEncontrada is not null)
            {
                postagemEncontrada.Titulo = postagem.Titulo;
                postagemEncontrada.Conteudo = postagem.Conteudo;
                postagemEncontrada.DataAtualizacao = DateTime.UtcNow;
                _dbContext.Postagens.Update(postagemEncontrada);
                await _dbContext.SaveChangesAsync();
                return postagemEncontrada;
            }
            
            return postagem;
        }

        public async Task<bool> DeletePostagemAsync(int postagemId)
        {
            var postagemEncontrada = await _dbContext.Postagens.FirstOrDefaultAsync<Postagem>(x => x.Id == postagemId);

            if (postagemEncontrada is not null)
            {
                _dbContext.Postagens.Remove(postagemEncontrada);

                return await _dbContext.SaveChangesAsync() > 0;
            }
            return false;
        }

    }
}
