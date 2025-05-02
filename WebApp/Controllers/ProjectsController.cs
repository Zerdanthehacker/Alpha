using Microsoft.AspNetCore.Mvc;
using Business.Models;

namespace WebApp.Controllers
{
    [Route("projects")]
    public class ProjectsController : Controller
    {
        // Tillfällig lista som låtsas vara en databas
        public static List<AddProjectCard> ProjectsList = new List<AddProjectCard>
        {
            new AddProjectCard { ProjectName = "Project 1", ClientName = "Client A", Description = "Description 1", Status = "started" },
            new AddProjectCard { ProjectName = "Project 2", ClientName = "Client B", Description = "Description 2", Status = "completed" }
        };

        [HttpGet]
        [Route("")]
        public IActionResult Projects()
        {
            if (HttpContext.Session.GetString("UserLoggedIn") != "true")
            {
                return RedirectToAction("Login", "Auth");
            }

            return View(ProjectsList);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("add")]
        public IActionResult AddProject(AddProjectForm model)
        {
            if (!ModelState.IsValid)
            {
                // Visa modalen igen
                ViewBag.ShowAddModal = true;

                // Skicka befintliga projekt så att sidan återanvänds korrekt
                return View("Projects", ProjectsList);
            }

            // Om allt är giltigt, lägg till nytt projekt
            var newProject = new AddProjectCard
            {
                ProjectName = model.ProjectName,
                ClientName = model.ClientName,
                Description = model.Description,
                Status = "started"
            };

            ProjectsList.Add(newProject);

            return RedirectToAction("Projects");
        }
    }
}
