namespace DESAFIOPROSPERI.Server.Models.ViewModels
{
    public class ClienteViewModel
    {
        public string Nome { get; set; }
        public string Cnpj { get; set; }

        public ClienteViewModel()
        {

        }

        public ClienteViewModel(string nome, string cnpj)
        {
            Nome = nome;
            Cnpj = cnpj;
        }

        public ICollection<ClienteViewModel> Transform(ICollection<Cliente> cliente)
        {
            ICollection<ClienteViewModel> clienteViewModelList =
                cliente.Select(a =>
                {
                    ClienteViewModel clienteViewModel = new ClienteViewModel(a.Nome, a.Cnpj);

                    return clienteViewModel;
                }).ToList();

            return clienteViewModelList;
        }

        public ClienteViewModel Transform(Cliente cliente)
        {
            var clienteViewModel = new ClienteViewModel(cliente.Nome, cliente.Cnpj);

            return clienteViewModel;
        }
    }
}
