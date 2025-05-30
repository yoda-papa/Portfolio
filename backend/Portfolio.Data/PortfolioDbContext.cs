using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Models;

namespace Portfolio.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Analytics> Analytics { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Project entity
        modelBuilder.Entity<Project>()
            .Property(p => p.Technologies)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

        // Configure Contact entity
        modelBuilder.Entity<Contact>()
            .Property(c => c.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");

        // Configure Analytics entity
        modelBuilder.Entity<Analytics>()
            .Property(a => a.Timestamp)
            .HasDefaultValueSql("GETUTCDATE()");
    }
} 