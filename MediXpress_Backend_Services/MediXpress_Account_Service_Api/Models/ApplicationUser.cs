using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MediXpress_Account_Service_Api.Models
{
    public class ApplicationUser:IdentityUser
    {
        [MaxLength(20)]
        public string? Name { get; set; }
    }
}
