using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TopConApp.Domain.Entities
{
    public class Login
    {
        [Required(ErrorMessage = "O campo Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email deve ter um formato válido")]
        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo Senha é obrigatório")]
        [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres")]
        [JsonPropertyName("senha")]
        public string Senha { get; set; } = string.Empty;
    }
}