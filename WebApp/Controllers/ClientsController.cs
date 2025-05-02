using Microsoft.AspNetCore.Mvc;
using Business.Models;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class ClientsController : Controller
    {
  
        public IActionResult Index()
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
    }
}
