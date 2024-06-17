using MediXpress_Medicine_Service_Api.Models;

namespace MediXpress_Medicine_Service_Api.Services
{
    public interface ICategoryServices
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> AddCategoryAsync(Category category);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
