using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace DESAFIOPROSPERI.Server.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        [StringLength(48, MinimumLength = 3, ErrorMessage = "{0} Precisa ter entre {2} e {1} caracteres")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        [RegularExpression(@"\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}", ErrorMessage = "{0} deve estar no formato 00.000.000/0000-00")]
        public string Cnpj { get; set; }

        public virtual ICollection<OS> OS { get; set; }

        public Cliente() 
        { 
        
        }

        public Cliente(int id, string nome, string cnpj)
        {
            Id = id;
            Nome = nome;
            Cnpj = cnpj;
        }
    }
}
