using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Portfolio.Api.Dtos
{
    public class ProjectCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public string? ImageUrl { get; set; }
        
        public string? ProjectUrl { get; set; }
        
        public List<string> Technologies { get; set; } = new();
        
        public DateTime StartDate { get; set; }
        
        public DateTime? EndDate { get; set; }
        
        public bool IsActive { get; set; }
    }
} 