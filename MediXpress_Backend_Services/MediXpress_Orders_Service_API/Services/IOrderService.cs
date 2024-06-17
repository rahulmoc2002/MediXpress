using MediXpress_Orders_Service_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MediXpress_Orders_Service_API.Services
{
    public interface IOrderService
    {
        Task<ActionResult<bool>> CreateOrder(Orders order);
        Task<IEnumerable<Orders>> GetAllOrders();
        Task<ActionResult<IEnumerable<Orders>>> GetOrdersByUserId(int userId);

    }
}
