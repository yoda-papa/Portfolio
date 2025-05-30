using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Portfolio.Data.Models;

public class Project
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    public string? ImageUrl { get; set; }
    
    public string? ProjectUrl { get; set; }
    
    internal string _technologiesJson = "[]";
    
    [NotMapped]
    public List<string> Technologies
    {
        get => JsonSerializer.Deserialize<List<string>>(_technologiesJson) ?? new List<string>();
        set => _technologiesJson = JsonSerializer.Serialize(value);
    }
    
    public DateTime StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public bool IsActive { get; set; }
}

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.Title)
            .IsRequired()
            .HasMaxLength(200);
            
        builder.Property(p => p.Description)
            .IsRequired();
            
        builder.Property(p => p._technologiesJson)
            .HasColumnName("Technologies")
            .IsRequired();
    }
} 