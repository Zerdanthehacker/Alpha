using System.ComponentModel.DataAnnotations;

namespace Business.Models
{
    public class AddProjectForm
    {
        [Display(Name = "Project Name")]
        [Required(ErrorMessage = "Project name is required")]
        public string ProjectName { get; set; } = null!;

        [Display(Name = "Client Name")]
        [Required(ErrorMessage = "Client name is required")]
        public string ClientName { get; set; } = null!;

        [Display(Name = "Description")]
        public string? Description { get; set; }

        [Display(Name = "Start Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }

        [Display(Name = "End Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }

        [Display(Name = "Budget")]
        [Range(0, double.MaxValue, ErrorMessage = "Budget must be 0 or more")]
        public decimal Budget { get; set; }
    }
}
