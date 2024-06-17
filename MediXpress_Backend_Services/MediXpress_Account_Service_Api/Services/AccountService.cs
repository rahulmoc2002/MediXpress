using MediXpress_Account_Service_Api.Data;
using MediXpress_Account_Service_Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Medixpress.UserManagement.API.Services
{
    public class AccountService : IAccountService
    {
        private readonly MediXpressUserDBcontext _userContext;
        private readonly UserManager<ApplicationUser> _userManager;
        public readonly RoleManager<IdentityRole> _roleManager;
        public readonly IConfiguration _configuration;

        public AccountService(MediXpressUserDBcontext userContext, UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configurationManager)
        {
            _userContext = userContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configurationManager;
        }

        public async Task<(int, string, User?)> Login(LoginData loginrequest)
        {
            var user = await _userManager.FindByEmailAsync(loginrequest.Email);
            if (user == null)
                return (0, "Invalid Email", null);
            if (!await _userManager.CheckPasswordAsync(user, loginrequest.Password))
                return (0, "Invalid password",null);

            var userRoles = await _userManager.GetRolesAsync(user);

            var validUser= _userContext.Users.FirstOrDefault(x=>x.Email.Equals(loginrequest.Email)&& x.Password.Equals(loginrequest.Password));
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            string token = GenerateToken(authClaims);
            return (1, token,validUser);
        }

        public async Task<(int, string)> Registration(User newUser)
        {
            var userExists = await _userManager.FindByNameAsync(newUser.UserName);
            if (userExists != null )
                return (0, "User already exists");

            ApplicationUser user = new ApplicationUser()
            {
                Email = newUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = newUser.UserName,
                Name = newUser.UserName
            };
            var createUserResult = await _userManager.CreateAsync(user, newUser.Password);
            if (!createUserResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again.");

            if (!await _roleManager.RoleExistsAsync(newUser.Roles))
                await _roleManager.CreateAsync(new IdentityRole(newUser.Roles));

            await _userManager.AddToRoleAsync(user, newUser.Roles);

            _userContext.Users.Add(newUser);
            await _userContext.SaveChangesAsync();

            return (1, "User created successfully!");
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _userContext.Users.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<User>>> GetUserById(int userId)
        {
            var users = await _userContext.Users.Where(x => x.UserId == userId).ToListAsync();
            return new ActionResult<IEnumerable<User>>(users);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
