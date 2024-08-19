using DESAFIOPROSPERI.Server.Exception;
using DESAFIOPROSPERI.Server.Models;
using DESAFIOPROSPERI.Server.Models.ViewModels;
using DESAFIOPROSPERI.Server.Services;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DESAFIOPROSPERI.Server.Controllers
{
    [Route("api/OS")]
    [ApiController]
    public class OSController : ControllerBase
    {
        private readonly ILogger<OSController> _logger;

        public OSController(ILogger<OSController> logger)
        {
            _logger = logger;
        }

        // GET: api/<OSController>
        [HttpGet]
        public async Task<ICollection<OSViewModel>> GetAll([FromServices] RepositoryService<OS> repositoryOS, [FromServices] RepositoryService<Prestador> repositoryPrestador, [FromServices] RepositoryService<Cliente> repositoryCliente)
        {
            var os = await repositoryOS.GetAllAsync(a => a.Cliente, a => a.Prestador);

            var osViewModel = new OSViewModel();

            var osViewModelList = osViewModel.Transform(os);


            return osViewModelList;
        }

        // GET api/<OSController>/5
        [HttpGet("{numOs}")]
        public async Task<OSViewModel> GetOne(int numOs, [FromServices] RepositoryService<OS> repositoryOS)
        {
            var os = await repositoryOS.GetOneByAsync(a => a.NumeroOS == numOs, a=> a.Cliente, a=> a.Prestador);

            var osViewModel = new OSViewModel();

            osViewModel = osViewModel.Transform(os);

            if(os == null)
            {
                throw new ApplicationException("OS Não Encontrada");
            }

            return osViewModel;
        }

        // POST api/<OSController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] OSViewModel osViewModel, [FromServices] OsService osService, [FromServices] RepositoryService<OS> repositoryOS, [FromServices] RepositoryService<Cliente> clienteService, [FromServices] RepositoryService<Prestador> prestadorService)
        {
            try
            {
               await osService.createOS(osViewModel, repositoryOS, clienteService, prestadorService);
            }
            catch(CreationOSException e) 
            { 
                return Results.Problem(e.Message);
            }

            return Results.Ok("OS criada com sucesso");
        }

        // PUT api/<OSController>/5
        [HttpPut("{numOs}")]
        public async Task<IResult> Put(int numOs, [FromServices] OsService osService ,[FromBody] OSViewModel oSViewModel, [FromServices] RepositoryService<OS> repositoryOS, [FromServices] RepositoryService<Cliente> repositoryCliente, [FromServices] RepositoryService<Prestador> repositoryPrestador)
        {
            if(oSViewModel.NumeroOS != numOs)
            {
                return Results.BadRequest("Erro na Requisição. Número OS fornecida pela URL não é a mesma com a do Body");
            }

            try
            {
                await osService.updateOS(oSViewModel, repositoryOS, repositoryCliente, repositoryPrestador);

                return Results.Ok("OS Atualizada com Sucesso");
            }
            catch(UpdateOSException e)
            {
                return Results.Problem(e.Message);
            }
        }

        // DELETE api/<OSController>/5
        [HttpDelete("{numOs}")]
        public async Task<IResult> Delete(int numOS, [FromServices] RepositoryService<OS> repositoryOS)
        {
            var osBanco = await repositoryOS.GetOneByAsync(a => a.NumeroOS == numOS);

            if (osBanco == null)
            {
                throw new ApplicationException("OS Não Encontrada");
            }

            await repositoryOS.RemoveAsync(osBanco);

            return Results.Ok("OS Deletada");
        }
    }
}
