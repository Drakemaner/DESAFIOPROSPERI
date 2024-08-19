using DESAFIOPROSPERI.Server.Exception;
using DESAFIOPROSPERI.Server.Models;
using DESAFIOPROSPERI.Server.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;

namespace DESAFIOPROSPERI.Server.Services
{
    public class OsService
    {
        public OsService() { }

        public async Task createOS(OSViewModel osViewModel, RepositoryService<OS> repositoryOS, RepositoryService<Cliente> clienteService, RepositoryService<Prestador> prestadorService)
        {
            var cliente = await clienteService.GetOneByAsync(a => a.Cnpj == osViewModel.Cliente.Cnpj || a.Nome == osViewModel.Cliente.Nome);
            var prestador = await prestadorService.GetOneByAsync(a => a.Cpf == osViewModel.Prestador.Cpf || a.Nome == osViewModel.Prestador.Nome);
            var os = await repositoryOS.GetOneByAsync(a => a.NumeroOS == osViewModel.NumeroOS);

            if (os != null)
            {
                throw new CreationOSException("Já há uma OS registrada com este mesmo número");
            }

            if (cliente != null)
            {
                if (cliente.Nome != osViewModel.Cliente.Nome)
                {
                    throw new CreationOSException("Já há um cliente com este CNPJ, embora não com este Nome");
                }
                else if(cliente.Cnpj != osViewModel.Cliente.Cnpj)
                {
                    throw new CreationOSException("Já há um cliente com este Nome, embora não com este CNPJ");
                }
            }

            if (prestador != null)
            {
                if (prestador.Nome != osViewModel.Prestador.Nome)
                {
                    throw new CreationOSException("Já há um cliente com este CPF, embora não com este Nome");
                }
                else if (prestador.Cpf != osViewModel.Prestador.Cpf)
                {
                    throw new CreationOSException("Já há um cliente com este Nome, embora não com este CPF");
                }
            }

            os = osViewModel.Transform();

            await repositoryOS.AddAsync(os);
        }

        public async Task updateOS(OSViewModel osViewModel, RepositoryService<OS> repositoryOS, RepositoryService<Cliente> clienteService, RepositoryService<Prestador> prestadorService)
        {
            var cliente = await clienteService.GetOneByAsync(a => a.Cnpj == osViewModel.Cliente.Cnpj || a.Nome == osViewModel.Cliente.Nome);
            var prestador = await prestadorService.GetOneByAsync(a => a.Cpf == osViewModel.Prestador.Cpf || a.Nome == osViewModel.Prestador.Nome);
            var os = await repositoryOS.GetOneByAsync(a => a.NumeroOS == osViewModel.NumeroOS);

            if (os == null)
            {
                throw new UpdateOSException("Não há uma OS registrada com este número");
            }

            if (cliente != null)
            {
                if (cliente.Nome != osViewModel.Cliente.Nome)
                {
                    throw new UpdateOSException("Já há um cliente com este CNPJ, embora não com este Nome");
                }
                else if (cliente.Cnpj != osViewModel.Cliente.Cnpj)
                {
                    throw new UpdateOSException("Já há um cliente com este Nome, embora não com este CNPJ");
                }
            }

            if (prestador != null)
            {
                if (prestador.Nome != osViewModel.Prestador.Nome)
                {
                    throw new UpdateOSException("Já há um cliente com este CPF, embora não com este Nome");
                }
                else if (prestador.Cpf != osViewModel.Prestador.Cpf)
                {
                    throw new UpdateOSException("Já há um cliente com este Nome, embora não com este CPF");
                }
            }

            var newOs = osViewModel.Transform();

            os.Prestador = newOs.Prestador;
            os.Cliente = newOs.Cliente;
            os.Valor = newOs.Valor;
            os.DataExecucao = newOs.DataExecucao;

            await repositoryOS.UpdateAsync(os);

        }
    }
}
