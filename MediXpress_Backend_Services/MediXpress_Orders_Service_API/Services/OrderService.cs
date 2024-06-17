using MediXpress_Orders_Service_API.Data;
using MediXpress_Orders_Service_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace MediXpress_Orders_Service_API.Services
{
    public class OrderService: IOrderService
    {
        private readonly OrderDB _context;
        public OrderService(OrderDB orderDB)
        {
            _context = orderDB;
        }

        public async Task<ActionResult<bool>> CreateOrder(Orders order)
        {
            _context.Orderset.Add(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Orders>> GetAllOrders()
        {
            return await _context.Orderset.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<Orders>>> GetOrdersByUserId(int userId)
        {
            var orders = await _context.Orderset.Where(order => order.UserId == userId).ToListAsync();

            if (orders == null || !orders.Any())
            {
                return new NotFoundResult();
            }

            return new ActionResult<IEnumerable<Orders>>(orders);
        }
    }
}
