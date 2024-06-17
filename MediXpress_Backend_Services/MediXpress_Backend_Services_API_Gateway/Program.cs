using Ocelot.DependencyInjection;
using Ocelot.Middleware;
//using JwtTokenAuthentication;
namespace MediXpress_Backend_Services_API_Gateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors();

            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //builder.Services.AddJwtAuthentication();
            builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("MediXpress_Ocelot_Config.json", false, reloadOnChange: true);
            builder.Services.AddOcelot();

            var app = builder.Build();
            app.UseCors(option => option.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            //await app.UseOcelot();
            app.UseOcelot().GetAwaiter().GetResult();
            app.MapControllers();
            app.MapGet("/", () => "Hello World!");
            app.Run();
        }
    }
}