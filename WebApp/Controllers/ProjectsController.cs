using Microsoft.AspNetCore.Mvc;
using Business.Models;

namespace WebApp.Controllers
{
    [Route("projects")]
    public class ProjectsController : Controller
    {
        // Simulerad databas
        public static List<AddProjectCard> ProjectsList = new List<AddProjectCard>
        {
            new AddProjectCard { ProjectName = "Project 1", ClientName = "Client A", Description = "Description 1", Status = "started" },
            new AddProjectCard { ProjectName = "Project 2", ClientName = "Client B", Description = "Description 2", Status = "completed" }
        };

        [HttpGet("")]
        public IActionResult Projects()
        {
            if (HttpContext.Session.GetString("UserLoggedIn") != "true")
            {
                return RedirectToAction("Login", "Auth");
            }

            return View(ProjectsList);
        }

        [HttpPost("add")]
        public IActionResult AddProject(AddProjectForm form)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToList()
                    );

                return BadRequest(new { success = false, errors });
            }

            var newProject = new AddProjectCard
            {
                ProjectName = form.ProjectName,
                ClientName = form.ClientName,
                Description = form.Description,
                Status = "started"
            };

            ProjectsList.Add(newProject);

            return Ok(new { success = true });
        }

        [HttpPost("edit")]
        public IActionResult EditProject(AddProjectForm form)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToList()
                    );

                return BadRequest(new { success = false, errors });
            }

            // Hitta rätt projekt i listan (matcha på namn)
            var project = ProjectsList.FirstOrDefault(p => p.ProjectName == form.ProjectName);
            if (project != null)
            {
                project.ClientName = form.ClientName;
                project.Description = form.Description;
                // Lägg till fler fält om du vill
            }

            return Ok(new { success = true });
        }


    }
}
