using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class EditClientForm
{
    public int Id { get; set; }

    [Display(Name = "Client Image", Prompt = "Change Image (optional)")]
    [DataType(DataType.Upload)]
    public IFormFile? ClientImage { get; set; } 

    [Display(Name = "Client Name", Prompt = "Update client name")]
    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Required")]
    public string ClientName { get; set; } = null!;

    [Display(Name = "Email", Prompt = "Update email address")]
    [DataType(DataType.EmailAddress)]
    [Required(ErrorMessage = "Required")]
    [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Invalid email")]
    public string Email { get; set; } = null!;

    [Display(Name = "Location", Prompt = "Update location")]
    [DataType(DataType.Text)]
    public string? Location { get; set; } = null!;

    [Display(Name = "Phone", Prompt = "Update phone number")]
    [DataType(DataType.PhoneNumber)]
    public string? Phone { get; set; } = null!;
}
