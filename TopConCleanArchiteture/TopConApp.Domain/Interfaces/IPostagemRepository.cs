using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TopConApp.Domain.Entities;

namespace TopConApp.Domain.Interfaces
{
    public interface IPostagemRepository
    {
        Task<IEnumerable<Postagem>> GetPostagens();
        Task<Postagem?> GetPostagensByIdAsync(int id);
        Task<Postagem> AddPostagemAsync(Postagem postagem);
        Task<Postagem> UpdatePostagemAsync(int postagemId, Postagem postagem);
        Task<bool> DeletePostagemAsync(int postagemId);
    }
}
