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
    public class PostagemController : ControllerBase
    {
        private ISender sender;
        public PostagemController(ISender mediator)
        {
            this.sender = mediator;
        }

        // TODO: Adicionar [Authorize(Roles = "admin")] quando JWT for implementado
        [HttpPost("")]
        public async Task<IActionResult> AddPostagemAsync([FromBody] Postagem postagem)
        {
            var result = await sender.Send(new AddPostagemCommand(postagem));
            return Ok(result);
        }
        
        // TODO: Adicionar [Authorize(Roles = "admin")] quando JWT for implementado
        [HttpDelete("{postagemId}")]
        public async Task<IActionResult> DeletePostagemAsync(int postagemId)
        {
            var result = await sender.Send(new DeletePostagemCommand(postagemId));
            return Ok(result);
        }
        
        // TODO: Adicionar [Authorize(Roles = "admin")] quando JWT for implementado
        [HttpPut("{postagemId}")]
        public async Task<IActionResult> UpdatePostagemAsync(int postagemId,[FromBody] Postagem postagem)
        {
            var result = await sender.Send(new UpdatePostagemCommand(postagemId,postagem));
            return Ok(result);
        }

        // Método GET pode ser acessado por qualquer usuário logado
        [HttpGet("postagens")]
        public async Task<IActionResult> GetAllPostagemAsync()
        {
            var result = await sender.Send(new GetAllPostagemsQuery());
            return Ok(result);
        }

        // Método GET pode ser acessado por qualquer usuário logado
        [HttpGet("postagens/{postagemId}")]
        public async Task<IActionResult> GetBylPostagemAsync([FromRoute] int postagemId)
        {
            var result = await sender.Send(new GetPostagensByIdQuery(postagemId));
            return Ok(result);
        }
    }
}
