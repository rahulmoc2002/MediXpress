using MediXpress_Orders_Service_API.Models;
using Microsoft.EntityFrameworkCore;

namespace MediXpress_Orders_Service_API.Data
{
    public class OrderDB : DbContext
    {
        public OrderDB(DbContextOptions<OrderDB> options)
            : base(options)
        {

        }
        public DbSet<Orders> Orderset { get; set; }
        
    }
}

