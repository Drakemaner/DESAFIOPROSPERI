using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DESAFIOPROSPERI.Server.Models.ViewModels
{
    public class OSViewModel
    {
        public int NumeroOS { get; set; }
        public string Titulo { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DataExecucao { get; set; }

        public double Valor { get; set; }


        public ClienteViewModel Cliente { get; set; }
        public PrestadorViewModel Prestador { get; set; }

        public OSViewModel(int numeroOS, string titulo, DateTime dataExecucao, double valor, ClienteViewModel cliente, PrestadorViewModel prestador)
        {
            NumeroOS = numeroOS;
            Titulo = titulo;
            DataExecucao = dataExecucao.Date;
            Valor = valor;
            Cliente = cliente;
            Prestador = prestador;
        }

        public OSViewModel()
        {

        }

        public ICollection<OSViewModel> Transform(ICollection<OS> os)
        {
            ICollection<OSViewModel> osViewModelList =
                os.Select(a =>
                {
                    PrestadorViewModel prestadorViewModel = new PrestadorViewModel(a.Prestador.Nome, a.Prestador.Cpf);

                    ClienteViewModel clienteViewModel = new ClienteViewModel(a.Cliente.Nome, a.Cliente.Cnpj);

                    OSViewModel osViewModel = new OSViewModel(a.NumeroOS, a.Titulo, a.DataExecucao, a.Valor, clienteViewModel, prestadorViewModel);

                    return osViewModel;
                }).ToList();

            return osViewModelList;
        }

        public OSViewModel Transform(OS os)
        {
            PrestadorViewModel prestadorViewModel = new PrestadorViewModel(os.Prestador.Nome, os.Prestador.Cpf);

            ClienteViewModel clienteViewModel = new ClienteViewModel(os.Cliente.Nome, os.Cliente.Cnpj);

            var osViewModel = new OSViewModel(os.NumeroOS, os.Titulo, os.DataExecucao, os.Valor, clienteViewModel, prestadorViewModel);

            return osViewModel;
        }
        public OS Transform()
        {
            Prestador prestador = new Prestador() { Nome = this.Prestador.Nome, Cpf = this.Prestador.Cpf};

            Cliente cliente = new Cliente() { Nome = this.Cliente.Nome, Cnpj = this.Cliente.Cnpj};

            var os = new OS() 
            { 
                NumeroOS = this.NumeroOS,
                Titulo = this.Titulo,
                Cliente = cliente,
                Prestador = prestador,
                DataExecucao = this.DataExecucao,
                Valor = this.Valor
            };

            return os;
        }
    }
}
