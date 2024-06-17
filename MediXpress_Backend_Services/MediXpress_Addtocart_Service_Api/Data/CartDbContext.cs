using MediXpress_Addtocart_Service_Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MediXpress_Addtocart_Service_Api.Data
{
    public class CartDbContext :DbContext
    {
            public CartDbContext(DbContextOptions<CartDbContext> options)
                : base(options)
            {

            }
            public DbSet<Cart> Carts { get; set; }
        }
    }
