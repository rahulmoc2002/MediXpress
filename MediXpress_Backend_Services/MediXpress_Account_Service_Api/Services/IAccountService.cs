using MediXpress_Account_Service_Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medixpress.UserManagement.API.Services
{
    public interface IAccountService
    {
        // Login Services
        Task<(int, string, User)> Login(LoginData loginrequest);

        // Register Service
        Task<(int, string)> Registration(User newUser);

        // Get All Users Service
        Task<List<User>> GetAllUsers();

        // Get User By Id Service
        Task<ActionResult<IEnumerable<User>>> GetUserById(int userId);
    }
}
