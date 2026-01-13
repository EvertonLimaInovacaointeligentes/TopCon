using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopConApp.Application.Commands;
using TopConApp.Application.Queries;
using TopConApp.Domain.Entities;

namespace TopConApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private ISender sender;
        public UsuarioController(ISender mediator)
        {
            this.sender = mediator;
        }
        [HttpPut("{usuarioId}")]
        public async Task<IActionResult> UpdatePostagemAsync(int usuarioId, [FromBody] Usuario usuario)
        {
            var result = await sender.Send(new UpdateUserCommand(usuarioId, usuario));
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await sender.Send(new LoginCommand(login.Email, login.Senha));
            
            if (!result.Success)
            {
                return Unauthorized(new { message = result.Message });
            }

            return Ok(new 
            { 
                message = result.Message,
                usuario = result.Usuario,
                token = result.Token
            });
        }

        [HttpGet("{usuarioId}")]
        public async Task<IActionResult> GetUsuarioByIdAsync(int usuarioId)
        {
            var result = await sender.Send(new GetUsuarioByIdQuery(usuarioId));
            if (result == null)
            {
                return NotFound($"Usuário com ID {usuarioId} não encontrado");
            }
            return Ok(result);
        }

        [HttpPost("")]
        public async Task<IActionResult> addUsuarioAsync([FromBody] Usuario usuario)
        {
            var result = await sender.Send(new AddUserCommand(usuario));
            return Ok(result);
        }
    }
}
