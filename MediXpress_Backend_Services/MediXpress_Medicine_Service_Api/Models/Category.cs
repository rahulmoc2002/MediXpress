using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.Marshalling;

namespace MediXpress_Medicine_Service_Api.Models
{
    //category Model
    [Table("tbl_Category")]
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CatName { get; set; }

        public virtual ICollection<Medicine>? Medicines { get; set; }   
       

    }
}
