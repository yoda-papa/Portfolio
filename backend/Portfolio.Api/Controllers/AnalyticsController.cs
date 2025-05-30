using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Data.Models;

namespace Portfolio.Api.Controllers;

public class AnalyticsController : BaseApiController
{
    private readonly PortfolioDbContext _context;

    public AnalyticsController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Analytics>>> GetAnalytics()
    {
        return await _context.Analytics.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Analytics?>> GetAnalytics(int id)
    {
        var analytics = await _context.Analytics.FindAsync(id);
        return HandleResult(analytics);
    }

    [HttpPost]
    public async Task<ActionResult<Analytics>> CreateAnalytics(Analytics analytics)
    {
        _context.Analytics.Add(analytics);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAnalytics), new { id = analytics.Id }, analytics);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAnalytics(int id, Analytics analytics)
    {
        if (id != analytics.Id)
            return BadRequest();

        _context.Entry(analytics).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AnalyticsExists(id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnalytics(int id)
    {
        var analytics = await _context.Analytics.FindAsync(id);
        if (analytics == null)
            return NotFound();

        _context.Analytics.Remove(analytics);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AnalyticsExists(int id)
    {
        return _context.Analytics.Any(e => e.Id == id);
    }
} 