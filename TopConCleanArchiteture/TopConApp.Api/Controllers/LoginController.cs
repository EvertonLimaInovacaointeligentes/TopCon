using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopConApp.Application.Commands;
using TopConApp.Domain.Entities;

namespace TopConApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ISender _sender;
        
        public LoginController(ISender mediator)
        {
            _sender = mediator;
        }
        
        [HttpPost("")]
        public async Task<IActionResult> CheckLoginAsync([FromBody] Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _sender.Send(new LoginCommand(login.Email, login.Senha));
            
            if (!result.Success)
            {
                return Unauthorized(new { message = result.Message });
            }

            return Ok(new 
            { 
                success = result.Success,
                message = result.Message,
                usuario = result.Usuario,
                token = result.Token
            });
        }
    }
}
