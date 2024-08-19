using DESAFIOPROSPERI.Server.Models;
using DESAFIOPROSPERI.Server.Models.ViewModels;
using DESAFIOPROSPERI.Server.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DESAFIOPROSPERI.Server.Controllers
{
    [Route("api/prestador")]
    [ApiController]
    public class PrestadoresController : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet("{cpf}")]
        public async Task<PrestadorViewModel> GetOneByCnpj(string cpf, [FromServices] RepositoryService<Prestador> repositoryService)
        {
           try
            {
                var prestador = await repositoryService.GetOneByAsync(a => a.Cpf == cpf);

                var prestadorViewModel = new PrestadorViewModel();

                if(prestador == null)
                {

                    return null;
                }
                else
                {
                    prestadorViewModel = prestadorViewModel.Transform(prestador);

                    return prestadorViewModel;
                }
            }
            catch(ApplicationException e)
            {
                throw new ApplicationException("Erro ao buscar o cliente");
            }
        }

        
    }
}
