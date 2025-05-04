using System.ComponentModel.DataAnnotations;

namespace Business.Models
{
    // Visningsmodell för projektkort (utan formdata som datum och budget)
    public class AddProjectCard
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9 .'-]{2,50}$",
            ErrorMessage = "Project name must be 2-50 characters and contain only letters, numbers, spaces, dot, apostrophe or hyphen.")]
        public string ProjectName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[a-zA-Z .'-]{2,50}$",
            ErrorMessage = "Client name must be 2-50 letters and can include spaces, dots, apostrophes, or hyphens.")]
        public string ClientName { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Description can't be longer than 500 characters.")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(started|completed)$",
            ErrorMessage = "Status must be either 'started' or 'completed'.")]
        public string Status { get; set; } = "started";
    }
}
