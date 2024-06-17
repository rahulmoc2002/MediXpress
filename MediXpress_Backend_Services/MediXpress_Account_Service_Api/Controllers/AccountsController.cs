
using Medixpress.UserManagement.API.Services;
using MediXpress_Account_Service_Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Eduhub.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Registration(User users)
        {
            var result = await _accountService.Registration(users);
            if (result.Item1 == 1)
            {
                return Ok("User Created Successfully");
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginData logindetails)
        {
            var result = await _accountService.Login(logindetails);
            if (result.Item1 == 1)
            {
                LoginResponse loginResponse = new LoginResponse
                {
                    Status=result.Item1,
                    Token=result.Item2,
                    CurrentUser=result.Item3,
                };
                
                return Ok(loginResponse);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }

        [HttpGet("all")]
        
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _accountService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _accountService.GetUserById(id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }
    }
}
