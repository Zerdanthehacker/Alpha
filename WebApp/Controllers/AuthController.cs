using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApp.Controllers
{
    public class AuthController : Controller
    {
        // Tillfällig lista för sparade användare
        public static List<(string Email, string Password)> Users = new List<(string Email, string Password)>
        {
            ("admin@example.com", "password123") // Ditt hårdkodade admin-konto
        };

        [HttpGet]
        public IActionResult Login()
        {
            // Om redan inloggad -> hoppa direkt till projects
            if (HttpContext.Session.GetString("UserLoggedIn") == "true")
                return RedirectToAction("Projects", "Projects");

            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            var user = Users.Find(u => u.Email == email && u.Password == password);

            if (user != default)
            {
                HttpContext.Session.SetString("UserLoggedIn", "true");
                return RedirectToAction("Projects", "Projects");
            }

            ViewBag.LoginError = "Invalid email or password.";
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            // Om redan inloggad -> hoppa direkt till projects
            if (HttpContext.Session.GetString("UserLoggedIn") == "true")
                return RedirectToAction("Projects", "Projects");

            return View();
        }

        [HttpPost]
        public IActionResult Register(string fullname, string email, string password, string confirmPassword)
        {
            if (password != confirmPassword)
            {
                ViewBag.RegisterError = "Passwords do not match.";
                return View();
            }

            if (Users.Exists(u => u.Email == email))
            {
                ViewBag.RegisterError = "Email is already registered.";
                return View();
            }

            Users.Add((email, password));
            TempData["RegisterSuccess"] = "Account created successfully! Please login.";
            return RedirectToAction("Login", "Auth");
        }

        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Auth");
        }

    }
}
