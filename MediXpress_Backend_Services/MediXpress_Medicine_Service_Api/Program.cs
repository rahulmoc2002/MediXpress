using MediXpress_Medicine_Service_Api.Data;
using MediXpress_Medicine_Service_Api.Extension;
using MediXpress_Medicine_Service_Api.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<IMedicineServices, MedicineService>();
builder.Services.AddScoped<ICategoryServices, CategoryService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MedicineDbContext>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("MedicineContext")));
builder.Services.AddCors(options => options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

//app.CreateDbIfNotExists();



app.UseAuthorization();

app.MapControllers();

app.Run();
