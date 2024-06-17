using System.ComponentModel.DataAnnotations;

namespace MediXpress_Addtocart_Service_Api.Models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

        public int MedId { get; set;}

        public int UserId { get; set;}  

        public int Quantity { get; set;}    

        public int TotalPrice { get; set;}  
    }
}
