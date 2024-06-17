using Medixpress_order_service.Data;
using Microsoft.EntityFrameworkCore;

namespace Medixpress_order_service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<OrderDB>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("PharmacyContext")));
            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();

            
            app.Run();
        }
    }
}
