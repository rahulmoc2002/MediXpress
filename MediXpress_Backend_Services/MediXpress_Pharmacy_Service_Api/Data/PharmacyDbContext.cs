using MediXpress_Pharmacy_Service_Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MediXpress_Pharmacy_Service_Api.Data
{
    public class PharmacyDbContext : DbContext
    {
        public PharmacyDbContext(DbContextOptions<PharmacyDbContext> options)
            : base(options)
        {

        }
        public DbSet<Pharmacy> Pharmacies { get; set; }
    }
}
