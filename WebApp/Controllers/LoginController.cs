using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    public class LoginController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(string email, string password)
        {
            // Enkelt exempel (du kan ersätta detta med databas senare)
            if (email == "admin@example.com" && password == "password123")
            {
                HttpContext.Session.SetString("UserLoggedIn", "true");
                return RedirectToAction("Projects", "Projects");
            }

            ViewBag.LoginError = "Invalid email or password.";
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Login");
        }
    }
}
