namespace MediXpress_Account_Service_Api.Models
{
    public class LoginResponse
    {
       public int Status {  get; set; }
        public string Token { get; set; }
        public User CurrentUser { get; set; }
    }
}
