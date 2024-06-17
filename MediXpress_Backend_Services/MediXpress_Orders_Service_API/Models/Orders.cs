using System.ComponentModel.DataAnnotations;

namespace MediXpress_Orders_Service_API.Models
{
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }
        public int Total {  get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string Flatno { get; set; }
        public int Pincode { get; set; }
        public int UserId { get; set; }
    }
}
