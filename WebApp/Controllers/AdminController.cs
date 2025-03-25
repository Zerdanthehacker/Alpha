using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("admin")]
    public class AdminController : Controller
    {
        [Route("members")]
        public IActionResult Members()
        {
            // Sätt titeln dynamiskt för denna vy
            ViewData["Title"] = "Team Members";
            return View();
        }
    }
}
