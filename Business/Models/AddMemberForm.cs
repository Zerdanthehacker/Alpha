using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Business.Models;

public class AddMemberForm
{
    [Display(Name = "Member Image", Prompt = "Select Image")]
    [DataType(DataType.Upload)]
    public IFormFile? MemberImage { get; set; }


    [Display(Name = "Member Name", Prompt = "Enter Member name")]
    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Required")]
    public string MemberName { get; set; } = null!;

    [Display(Name = "Email", Prompt = "Enter email adress")]
    [DataType(DataType.EmailAddress)]
    [Required(ErrorMessage = "Required")]
    [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Invalid email")]

    public string Email { get; set; } = null!;

    [Display(Name = "Location", Prompt = "Enter Location")]
    [DataType(DataType.Text)]
    public string? Location { get; set; } = null!;

    [Display(Name = "Phone", Prompt = "Enter Phone Number")]
    [DataType(DataType.PhoneNumber)]
    public string? Phone { get; set; } = null!;
}
