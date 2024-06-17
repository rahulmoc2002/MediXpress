using System.ComponentModel.DataAnnotations;

namespace Medixpress_order_service.Models
{
    public class Orders
    {
        [Key]
        public int Total { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public int Flatno { get; set; }
        public string State { get; set; }
        public int Pincode { get; set; }

    }
}
