using MediXpress_Addtocart_Service_Api.Models;

namespace MediXpress_Addtocart_Service_Api.Services
{
    public interface ICartServices
    {
        Task<Cart> AddToCartAsync(Cart cart);
        Task<Cart> UpdateCartAsync(Cart cart);
        Task<Cart> GetCartByIdAsync(int cartId);
        Task<List<Cart>> GetAllCartsAsync();
        Task<bool> DeleteCartAsync(int cartId);
    }
}
