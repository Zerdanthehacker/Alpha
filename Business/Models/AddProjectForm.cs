using System.ComponentModel.DataAnnotations;

namespace Business.Models
{
    public class AddProjectForm
    {
        [Display(Name = "Project Name", Prompt = "Enter project name")]
        [DataType(DataType.Text)]
        [Required(ErrorMessage = "Required")]
        public string ProjectName { get; set; } = null!;

        [Display(Name = "Client Name", Prompt = "Enter client name")]
        [DataType(DataType.Text)]
        [Required(ErrorMessage = "Required")]
        public string ClientName { get; set; } = null!;

        [Display(Name = "Description", Prompt = "Enter description")]
        [DataType(DataType.MultilineText)]
        [Required(ErrorMessage = "Required")]
        public string Description { get; set; } = null!;

        [Display(Name = "Start Date", Prompt = "Select start date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Required")]
        public DateTime StartDate { get; set; }

        [Display(Name = "End Date", Prompt = "Select end date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Required")]
        public DateTime EndDate { get; set; }

        [Display(Name = "Budget", Prompt = "Enter budget")]
        [DataType(DataType.Currency)]
        [Range(0, double.MaxValue, ErrorMessage = "Must be 0 or more")]
        public decimal Budget { get; set; }
    }
}
