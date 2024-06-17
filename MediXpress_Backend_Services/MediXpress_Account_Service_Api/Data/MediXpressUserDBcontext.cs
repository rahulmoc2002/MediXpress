using MediXpress_Account_Service_Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MediXpress_Account_Service_Api.Data
{
    public class MediXpressUserDBcontext : IdentityDbContext<ApplicationUser>
    {
        public MediXpressUserDBcontext(DbContextOptions<MediXpressUserDBcontext> options) : base(options) { }

        // define the User Model to Access Database:
        public DbSet<User> Users { get; set; }
    }
}
