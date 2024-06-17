

using MassTransit;
using Medixpress.UserManagement.API.Services;
using MediXpress_Account_Service_Api.Data;
using MediXpress_Account_Service_Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

// add the identity dbContext in Our Application

builder.Services.AddDbContext<MediXpressUserDBcontext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("AccountConnection"))
);

// Configure RabbitMQ

//builder.Services.AddMassTransit(x =>
//{

//    // Add outbox
//    x.AddEntityFrameworkOutbox<MediXpressUserDBcontext>(o => {
//        o.QueryDelay = TimeSpan.FromSeconds(10);
//        o.UseSqlServer();
//        o.UseBusOutbox();


//    });

//x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("User", false));
//    // Setup RabbitMQ Endpoint

//    x.UsingRabbitMq((context, cfg) =>
//{

//    cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
//    {
//        host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
//        host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
//    });
//    cfg.ConfigureEndpoints(context);
//});
//});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<MediXpressUserDBcontext>()
    .AddDefaultTokenProviders();
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
}); ;
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddAuthentication(
    options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

    }
    ).AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.IncludeErrorDetails = true;
        options.Events = new JwtBearerEvents()
        {
            OnMessageReceived = (msg) =>
            {
                var token = msg?.Request.Headers.Authorization.ToString();
                string path = msg?.Request.Path ?? "";
                if (!string.IsNullOrEmpty(token))

                {
                    Console.WriteLine("Access token");
                    Console.WriteLine($"URL: {path}");
                    Console.WriteLine($"Token: {token}\r\n");
                }
                else
                {
                    Console.WriteLine("Access token");
                    Console.WriteLine("URL: " + path);
                    Console.WriteLine("Token: No access token provided\r\n");
                }
                return Task.CompletedTask;
            },
            OnTokenValidated = ctx =>
            {
                Console.WriteLine();
                Console.WriteLine("Claims from the access token");
                if (ctx?.Principal != null)
                {
                    foreach (var claim in ctx.Principal.Claims)
                    {
                        Console.WriteLine($"{claim.Type} - {claim.Value}");
                    }
                }
                Console.WriteLine();
                return Task.CompletedTask;
            }
        };
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidAudience = builder.Configuration["JWT:ValidAudience"],
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
        };

    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// include authentication Serices



// Allow Cors 
builder.Services.AddCors(options =>
options.AddDefaultPolicy(builder =>
{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
})
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.CreateDbIfNotExists();


app.UseHttpsRedirection();
app.UseAuthentication();


app.UseAuthorization();
app.UseCors();
app.MapControllers();

app.Run();
