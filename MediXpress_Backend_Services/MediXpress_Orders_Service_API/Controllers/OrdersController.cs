using MediXpress_Orders_Service_API.Models;
using MediXpress_Orders_Service_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediXpress_Orders_Service_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateMedicine([FromBody] Orders order)
        {
            var result = await _orderService.CreateOrder(order);
            if (result.Value)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Value);
        }
        [HttpGet("GetallOrders")]
        public async Task<IActionResult> GetAllMedicine()
        {
            var result = await _orderService.GetAllOrders();
            return Ok(result);
        }
        [HttpGet("GetOrdersByUserId/{userId}")]
        public async Task<IActionResult> GetOrdersByUserId(int userId)
        {
            var result = await _orderService.GetOrdersByUserId(userId);
            if (result.Result is NotFoundResult)
            {
                return NotFound();
            }
            return Ok(result.Value);
        }
    }
}
