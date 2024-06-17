using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
// Medicine Model
namespace MediXpress_Medicine_Service_Api.Models
{
    [Table("tbl_Medicines")]
    public class Medicine
    {
        [Key]
        [Column("med_id")]
        public int Id { get; set; }
        [Required]
        public string MedName { get; set; }
        [Required]
        public string MedDescription { get; set; }
        [Required]
        public int MedPower { get; set; }
        [Required]
        public string MedStatus { get; set; }

        public int MedCost { get; set; }    

        public string MedImage { get; set; }    

        public string PharmacyName { get; set; } 
        
        [Required]
        public int PharmacyId { get; set; }
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }
    }
}