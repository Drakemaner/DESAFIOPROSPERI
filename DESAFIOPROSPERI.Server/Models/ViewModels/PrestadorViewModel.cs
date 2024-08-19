namespace DESAFIOPROSPERI.Server.Models.ViewModels
{
    public class PrestadorViewModel
    {
        public string Nome { get; set; }
        public string Cpf { get; set; }

        public PrestadorViewModel()
        {

        }

        public PrestadorViewModel(string nome, string cpf)
        {
            Nome = nome;
            Cpf = cpf;
        }

        public ICollection<PrestadorViewModel> Transform(ICollection<Prestador> prestador)
        {
            ICollection<PrestadorViewModel> prestadorViewModelList =
                prestador.Select(a =>
                {
                    PrestadorViewModel prestadorViewModel = new PrestadorViewModel(a.Nome, a.Cpf);

                    return prestadorViewModel;
                }).ToList();

            return prestadorViewModelList;
        }

        public PrestadorViewModel Transform(Prestador prestador)
        {
            var prestadorViewModel = new PrestadorViewModel(prestador.Nome, prestador.Cpf);

            return prestadorViewModel;
        }
    }
}
