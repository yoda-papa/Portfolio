using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    protected ActionResult<T> HandleResult<T>(T result)
    {
        if (result == null) return NotFound();
        return Ok(result);
    }

    protected ActionResult<T> HandleResult<T>(IEnumerable<T> results)
    {
        if (results == null || !results.Any()) return NotFound();
        return Ok(results);
    }
} 