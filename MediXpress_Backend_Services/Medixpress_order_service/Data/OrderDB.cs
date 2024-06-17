using Medixpress_order_service.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Medixpress_order_service.Data
{
    public class OrderDB: DbContext
    {
        public OrderDB(DbContextOptions<OrderDB> options)
            : base(options)
        {

        }
        public DbSet<Orders> Pharmacies { get; set; }
    }
}
