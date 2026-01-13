using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TopConApp.Domain.Entities
{
    public class Postagem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        public string Conteudo { get; set; } = string.Empty;

        public DateTime DataCriacao { get; set; }

        public DateTime? DataAtualizacao { get; set; }

        [Required]
        public int UsuarioId { get; set; }
        
        // Propriedade de navegação
        public Usuario? Usuario { get; set; }
    }
}
