using System.ComponentModel.DataAnnotations;

namespace MediXpress_Pharmacy_Service_Api.Models
{
    public class Pharmacy
    {
        [Required]
        public int PharmacyId { get; set; }

        public string PharmacyName { get; set; }

        public int LicenseNumber { get; set; }  

        public string Address { get; set; } 

        public string City { get; set; }

        public string State {  get; set; }  

        public int PostalCode { get; set; } 

        public long Phonenumber { get; set; }
        [Required]
        public int UserId { get; set; }


    }
}
