using Business.Models;
using Microsoft.AspNetCore.Mvc;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("admin")]
    public class AdminController : Controller
    {
        [Route("members")]
        public IActionResult Members()
        {
            return View();
        }

        [Route("clients")]
        public IActionResult Clients()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddClient(AddClientForm form)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(x => x.ErrorMessage).ToList()
                    );

                return BadRequest(new { success = false, errors });
            }

            return Ok(new { success = true });
        }

        [HttpPost]
        public IActionResult EditClient(EditClientForm form)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(x => x.ErrorMessage).ToList()
                    );

                return BadRequest(new { success = false, errors });
            }

            return Ok(new { success = true });
        }

        [HttpPost]
        public IActionResult AddMember(AddMemberForm form)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(x => x.ErrorMessage).ToList()
                    );

                return BadRequest(new { success = false, errors });
            }

            return Ok(new { success = true });
        }

        [HttpPost]
        public IActionResult EditMember(EditMemberForm form)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(x => x.ErrorMessage).ToList()
                    );

                return BadRequest(new { success = false, errors });
            }

            return Ok(new { success = true });
        }
    }
}
