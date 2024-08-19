using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace DESAFIOPROSPERI.Server.Models
{
    public class OS
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        public int NumeroOS { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        public string Titulo { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        public Cliente Cliente { get; set; }
        public int ClienteId { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        public Prestador Prestador { get; set; }
        public int PrestadorId { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        [DataType(DataType.Date)]
        public DateTime DataExecucao { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        [Range(1.0, 9999999, ErrorMessage = "{0} Precisa ser entre {1} e {2}")]
        public double Valor { get; set; }

        public OS()
        {

        }

        public OS(int id, int numeroOS, string titulo, Cliente cliente, Prestador prestador, DateTime dataExecucao, double valor)
        {
            Id = id;
            NumeroOS = numeroOS;
            Titulo = titulo;
            Cliente = cliente;
            Prestador = prestador;
            DataExecucao = dataExecucao.Date;
            Valor = valor;
        }
    }
}
