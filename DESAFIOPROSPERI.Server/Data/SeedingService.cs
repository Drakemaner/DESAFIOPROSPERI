using DESAFIOPROSPERI.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DESAFIOPROSPERI.Server.Data
{
    public class SeedingService
    {
        private DevDbContext _dbContext;

        public SeedingService(DevDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task Seed()
        {
            if (_dbContext.OS.Any() || _dbContext.Prestador.Any() || _dbContext.Cliente.Any())
            {
                return;
            }

            Cliente cliente1 = new Cliente(1, "Amazon", "21.239.712/3923-64");
            Cliente cliente2 = new Cliente(2, "Prosperi", "12.323.134/7823-91");
            Cliente cliente3 = new Cliente(3, "Netflix", "45.645.776/7674-82");
            Cliente cliente4 = new Cliente(4, "Microsoft", "43.543.453/7123-52");
            Cliente cliente5 = new Cliente(5, "Sony", "78.987.979/6576-75");

            Prestador prestador1 = new Prestador(1, "Guilherme Jenner", "232.113.456-02");
            Prestador prestador2 = new Prestador(2, "Roberto Almeida", "252.123.356-01");
            Prestador prestador3 = new Prestador(3, "Rodrigo Gonçalves", "282.116.156-22");
            Prestador prestador4 = new Prestador(4, "Gabriel Alves", "282.174.536-72");
            Prestador prestador5 = new Prestador(5, "Carlos Moraes", "192.113.446-84");
            Prestador prestador6 = new Prestador(6, "Ricardo Carvalho", "242.113.476-14");

            OS os1 = new OS(1, 1, "Serviço 01", cliente1, prestador1, DateTime.UtcNow.Date, 5200);
            OS os2 = new OS(2, 2, "Serviço 02", cliente1, prestador2, DateTime.UtcNow.Date, 5200);
            OS os3 = new OS(3, 3, "Serviço 03", cliente1, prestador3, DateTime.UtcNow.Date, 5200);
            OS os4 = new OS(4, 4, "Serviço 04", cliente1, prestador4, DateTime.UtcNow.Date, 5200);
            OS os5 = new OS(5, 5, "Serviço 05", cliente2, prestador1, DateTime.UtcNow.Date, 5200);
            OS os6 = new OS(6, 6, "Serviço 06", cliente2, prestador5, DateTime.UtcNow.Date, 5200);
            OS os7 = new OS(7, 7, "Serviço 07", cliente2, prestador6, DateTime.UtcNow.Date, 5200);
            OS os8 = new OS(8, 8, "Serviço 08", cliente3, prestador2, DateTime.UtcNow.Date, 5200);
            OS os9 = new OS(9, 9, "Serviço 09", cliente3, prestador2, DateTime.UtcNow.Date, 5200);
            OS os10 = new OS(10, 10, "Serviço 10", cliente3, prestador1, DateTime.UtcNow.Date, 5200);
            OS os11 = new OS(11, 11, "Serviço 11", cliente3, prestador6, DateTime.UtcNow.Date, 5200);
            OS os12 = new OS(12, 12, "Serviço 12", cliente4, prestador3, DateTime.UtcNow.Date, 5200);
            OS os13 = new OS(13, 13, "Serviço 13", cliente4, prestador2, DateTime.UtcNow.Date, 5200);
            OS os14 = new OS(14, 14, "Serviço 14", cliente4, prestador5, DateTime.UtcNow.Date, 5200);
            OS os15 = new OS(15, 15, "Serviço 15", cliente5, prestador3, DateTime.UtcNow.Date, 5200);
            OS os16 = new OS(16, 16, "Serviço 16", cliente5, prestador2, DateTime.UtcNow.Date, 5200);
            OS os17 = new OS(17, 17, "Serviço 17", cliente5, prestador6, DateTime.UtcNow.Date, 5200);
            OS os18 = new OS(18, 18, "Serviço 18", cliente1, prestador1, DateTime.UtcNow.Date, 5200);

            _dbContext.Prestador.AddRange(
                    prestador1,
                    prestador2,
                    prestador3,
                    prestador4,
                    prestador5,
                    prestador6
            );

            _dbContext.Cliente.AddRange(
                    cliente1,
                    cliente2,
                    cliente3,
                    cliente4,
                    cliente5
            );

            _dbContext.OS.AddRange(
                    os1,
                    os2,
                    os3,
                    os4,
                    os5,
                    os6,
                    os7,
                    os8,
                    os9,
                    os10,
                    os11,
                    os12,
                    os13,
                    os14,
                    os15,
                    os16,
                    os17,
                    os18
            );

            await _dbContext.SaveChangesAsync();
        }
    }
}
