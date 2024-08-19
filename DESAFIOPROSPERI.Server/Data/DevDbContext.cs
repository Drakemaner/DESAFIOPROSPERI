using DESAFIOPROSPERI.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DESAFIOPROSPERI.Server.Data
{
    public class DevDbContext : DbContext
    {
        public DevDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<OS> OS { get; set; } = default!;
        public DbSet<Prestador> Prestador { get; set; } = default!;
        public DbSet<Cliente> Cliente { get; set; } = default!;


    }
}
