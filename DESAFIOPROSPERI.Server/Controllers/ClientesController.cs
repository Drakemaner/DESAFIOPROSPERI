using DESAFIOPROSPERI.Server.Models;
using DESAFIOPROSPERI.Server.Models.ViewModels;
using DESAFIOPROSPERI.Server.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DESAFIOPROSPERI.Server.Controllers
{
    [Route("api/cliente")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet("{cnpj}")]
        public async Task<ClienteViewModel> GetOneByCnpj(string cnpj, [FromServices] RepositoryService<Cliente> repositoryService)
        {
            cnpj = cnpj.Replace("_", "/");

           try
            {
                var cliente = await repositoryService.GetOneByAsync(a => a.Cnpj == cnpj);

                var clienteViewModel = new ClienteViewModel();


                if(cliente == null)
                {

                    return null;
                }
                else
                {
                    clienteViewModel = clienteViewModel.Transform(cliente);

                    return clienteViewModel;
                }
            }
            catch(ApplicationException e)
            {
                throw new ApplicationException("Erro ao buscar o cliente");
            }
        }

        
    }
}
