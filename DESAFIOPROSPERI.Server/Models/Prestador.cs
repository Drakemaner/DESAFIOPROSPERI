using System.ComponentModel.DataAnnotations;

namespace DESAFIOPROSPERI.Server.Models
{
    public class Prestador
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        [StringLength(32, MinimumLength = 4, ErrorMessage = "{0} Precisa ter entre {2} e {1} caracteres")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "{0} É Obrigatório")]
        [RegularExpression(@"\d{3}\.\d{3}\.\d{3}-\d{2}", ErrorMessage = "{0} deve estar no formato 000.000.000-00")]
        public string Cpf { get; set; }
        public virtual ICollection<OS> OS { get; set; }

        public Prestador() 
        { 
            
        }

        public Prestador(int id, string nome, string cpf)
        {
            Id = id;
            Nome = nome;
            Cpf = cpf;
        }
    }
}
