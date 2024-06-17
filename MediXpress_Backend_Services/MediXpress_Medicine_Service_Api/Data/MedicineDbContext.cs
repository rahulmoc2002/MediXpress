using MediXpress_Medicine_Service_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MediXpress_Medicine_Service_Api.Data
{
    public class MedicineDbContext : DbContext
    {
        public MedicineDbContext(DbContextOptions<MedicineDbContext> options)
            : base(options)
        {

        }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
