using System.ComponentModel.DataAnnotations;

namespace Portfolio.Data.Models;

public class Analytics
{
    public int Id { get; set; }
    
    [Required]
    public string PageUrl { get; set; } = string.Empty;
    
    public string? UserAgent { get; set; }
    
    public string? IpAddress { get; set; }
    
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    public string? Referrer { get; set; }
    
    public int TimeSpent { get; set; } // in seconds
} 