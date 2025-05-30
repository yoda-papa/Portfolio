using Portfolio.Data;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Portfolio.Api.Hubs;
using Portfolio.Api.Dtos;
using AutoMapper;

// Set invariant culture for the application
CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;
Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;
Thread.CurrentThread.CurrentUICulture = CultureInfo.InvariantCulture;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Add SignalR
builder.Services.AddSignalR();

// Add CORS with specific policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PortfolioDb")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Portfolio API",
        Version = "v1",
        Description = "API for Portfolio Management"
    });
});

// Add authorization services
builder.Services.AddAuthorization();

var app = builder.Build();

// Ensure database is created and seeded with data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<PortfolioDbContext>();
        context.Database.EnsureDeleted(); // Delete existing database
        context.Database.EnsureCreated(); // Create fresh database

        // Seed the database with sample data
        if (!context.Projects.Any())
        {
            context.Projects.AddRange(
                new Portfolio.Data.Models.Project
                {
                    Title = "Sample Project 1",
                    Description = "This is a description for sample project 1.",
                    ImageUrl = "https://via.placeholder.com/300", // Placeholder image URL
                    ProjectUrl = "https://www.sampleproject1.com",
                    Technologies = new List<string> { "Angular", "C#", ".NET" },
                    StartDate = DateTime.UtcNow.AddMonths(-6),
                    EndDate = DateTime.UtcNow.AddMonths(-3),
                    IsActive = true
                },
                new Portfolio.Data.Models.Project
                {
                    Title = "Sample Project 2",
                    Description = "This is a description for sample project 2.",
                    ImageUrl = "https://via.placeholder.com/300", // Placeholder image URL
                    ProjectUrl = "https://www.sampleproject2.com",
                    Technologies = new List<string> { "React", "Node.js" },
                    StartDate = DateTime.UtcNow.AddMonths(-12),
                    EndDate = DateTime.UtcNow.AddMonths(-9),
                    IsActive = true
                }
            );
            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while creating or seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API V1");
        c.RoutePrefix = "swagger";
    });
}

// Use CORS before other middleware
app.UseCors("AllowAll");

// Add detailed error pages in development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthorization();

app.MapControllers();
app.MapHub<PortfolioHub>("/portfolioHub");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
