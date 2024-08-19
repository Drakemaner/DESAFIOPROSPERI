using DESAFIOPROSPERI.Server.Data;
using DESAFIOPROSPERI.Server.Models;
using DESAFIOPROSPERI.Server.Services;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DevDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DevContext") ?? throw new InvalidOperationException("Connection string 'UDEMY_PROJECTContext' not found."), new MySqlServerVersion(new Version(8, 0, 39, 9)),
        builder =>
            builder.MigrationsAssembly("DESAFIOPROSPERI.Server")
    ));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<SeedingService>();

builder.Services.AddScoped<RepositoryService<OS>>();
builder.Services.AddScoped<RepositoryService<Cliente>>();
builder.Services.AddScoped<RepositoryService<Prestador>>();
builder.Services.AddScoped<OsService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",

        builder => builder.WithOrigins("https://localhost:4200").AllowAnyHeader().AllowAnyMethod()
     );
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using(var scope = app.Services.CreateScope())
    {
        var service = scope.ServiceProvider.GetRequiredService<SeedingService>();

        await service.Seed();
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
