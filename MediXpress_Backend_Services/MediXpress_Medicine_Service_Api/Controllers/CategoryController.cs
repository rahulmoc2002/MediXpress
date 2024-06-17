using MediXpress_Medicine_Service_Api.Models;
using MediXpress_Medicine_Service_Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediXpress_Medicine_Service_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _categoryServices;

        public CategoryController(ICategoryServices categoryServices)
        {
            _categoryServices = categoryServices;
        }
        [HttpGet("GetallCategories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _categoryServices.GetAllCategoriesAsync();
            return Ok(categories);
        }

        // GET: api/Category/5
        [HttpGet("GetCategoryBy/{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _categoryServices.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        // POST: api/Category
        [HttpPost("AddCategory")]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            if (category == null)
            {
                return BadRequest("Category data is null.");
            }
            var createdCategory = await _categoryServices.AddCategoryAsync(category);
            return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.Id }, createdCategory);
        }


        

        // DELETE: api/Category/5
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoryServices.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound($"Category with Id = {id} not found.");
            }

            await _categoryServices.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
