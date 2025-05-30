using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Data.Models;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using Portfolio.Api.Dtos;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ProjectsController : ControllerBase
{
    private readonly PortfolioDbContext _context;
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(PortfolioDbContext context, ILogger<ProjectsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProjectDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
    {
        _logger.LogInformation("Getting all projects");
        var projects = await _context.Projects.ToListAsync();
        _logger.LogInformation("Found {Count} projects", projects.Count);
        
        var projectDtos = projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            ImageUrl = p.ImageUrl,
            ProjectUrl = p.ProjectUrl,
            Technologies = p.Technologies,
            StartDate = p.StartDate,
            EndDate = p.EndDate,
            IsActive = p.IsActive
        });
        
        return Ok(projectDtos);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProjectDto>> GetProject(int id)
    {
        _logger.LogInformation("Getting project with ID: {Id}", id);
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            _logger.LogWarning("Project with ID {Id} not found", id);
            return NotFound();
        }
        _logger.LogInformation("Found project: {Title}", project.Title);
        
        var projectDto = new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            ImageUrl = project.ImageUrl,
            ProjectUrl = project.ProjectUrl,
            Technologies = project.Technologies,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            IsActive = project.IsActive
        };
        
        return Ok(projectDto);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Project), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Project>> CreateProject([FromBody] ProjectCreateDto projectDto)
    {
        try
        {
            _logger.LogInformation("Creating new project: {Title}", projectDto.Title);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid project data: {Errors}", 
                    string.Join(", ", ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }

            var project = new Project
            {
                Title = projectDto.Title,
                Description = projectDto.Description,
                ImageUrl = projectDto.ImageUrl,
                ProjectUrl = projectDto.ProjectUrl,
                Technologies = projectDto.Technologies,
                StartDate = projectDto.StartDate,
                EndDate = projectDto.EndDate,
                IsActive = projectDto.IsActive
            };
            
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Project created successfully with ID: {Id}", project.Id);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating project: {Message}", ex.Message);
            return StatusCode(500, new { error = "An error occurred while creating the project", details = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectDto projectDto)
    {
        _logger.LogInformation("Updating project with ID: {Id}", id);
        
        if (id != projectDto.Id)
        {
            _logger.LogWarning("ID mismatch: {Id} != {ProjectId}", id, projectDto.Id);
            return BadRequest(new { error = "ID mismatch" });
        }

        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            _logger.LogWarning("Project with ID {Id} not found for update", id);
            return NotFound(new { error = "Project not found" });
        }

        project.Title = projectDto.Title;
        project.Description = projectDto.Description;
        project.ImageUrl = projectDto.ImageUrl;
        project.ProjectUrl = projectDto.ProjectUrl;
        project.Technologies = projectDto.Technologies;
        project.StartDate = projectDto.StartDate;
        project.EndDate = projectDto.EndDate;
        project.IsActive = projectDto.IsActive;

        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Project updated successfully");
            return NoContent();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectExists(id))
            {
                _logger.LogWarning("Project with ID {Id} not found during update", id);
                return NotFound(new { error = "Project not found" });
            }
            throw;
        }
        catch (Exception ex)
        {
             _logger.LogError(ex, "Error updating project: {Message}", ex.Message);
            return StatusCode(500, new { error = "An error occurred while updating the project", details = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteProject(int id)
    {
        _logger.LogInformation("Deleting project with ID: {Id}", id);
        
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            _logger.LogWarning("Project with ID {Id} not found for deletion", id);
            return NotFound(new { error = "Project not found" });
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        
        _logger.LogInformation("Project deleted successfully");
        return NoContent();
    }

    private bool ProjectExists(int id)
    {
        return _context.Projects.Any(e => e.Id == id);
    }
}

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