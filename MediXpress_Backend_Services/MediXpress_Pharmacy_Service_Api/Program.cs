using JwtTokenAuthentication;
using MediXpress_Pharmacy_Service_Api.Data;
using MediXpress_Pharmacy_Service_Api.Services;
using MediXpress_Pharmacy_Service_API.Extension;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddScoped<IPharmacyServices, PharmacyService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PharmacyDbContext>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("PharmacyContext")));
builder.Services.AddCors(options=>options.AddDefaultPolicy(builder=>builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddJwtAuthentication();
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