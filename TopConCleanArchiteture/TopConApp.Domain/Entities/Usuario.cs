using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TopConApp.Domain.Entities
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string NomeUsuario { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string SenhaHash { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string Role { get; set; } = "user"; // "admin" ou "user"

        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

        public DateTime? DataAtualizacao { get; set; }
    }
}
