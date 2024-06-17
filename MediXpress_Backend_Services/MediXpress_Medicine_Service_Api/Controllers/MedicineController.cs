using System.Collections.Generic;
using System.Threading.Tasks;
using MediXpress_Medicine_Service_Api.Models;
using MediXpress_Medicine_Service_Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MediXpress_Medicine_Service_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineServices _medicineService;

        public MedicineController(IMedicineServices medicineService)
        {
            _medicineService = medicineService;
        }

        // POST: api/Medicine
        [HttpPost("Create")]
        public async Task<IActionResult> CreateMedicine([FromBody] Medicine medicine)
        {
            var result = await _medicineService.CreateMedicine(medicine);
            if (result.Value)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Value);
        }

        // DELETE: api/Medicine/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteMedicine(int id)
        {
            var result = await _medicineService.DeleteMedicine(id);
            if (result.Value)
            {
                return Ok(result.Value);
            }
            return NotFound(result.Value);
        }

        // PUT: api/Medicine/{id}
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> EditMedicine(int id, [FromBody] Medicine updatedMedicine)
        {
            var result = await _medicineService.EditMedicine(id, updatedMedicine);
            if (result.Value)
            {
                return Ok(result.Value);
            }
            return NotFound(result.Value);
        }

        // GET: api/Medicine/{id}
        [HttpGet("GetMedicineById/{id}")]
        public async Task<IActionResult> GetMedicineById(int id)
        {
            var result = await _medicineService.GetMedicinebyId(id);
            if (result.Result is NotFoundResult)
            {
                return NotFound();
            }
            return Ok(result.Value);
        }

        // GET: api/Medicine
        [HttpGet("GetAllMedicines")]
        public async Task<IActionResult> GetAllMedicine()
        {
            var result = await _medicineService.GetAllMedicine();
            return Ok(result);
        }

        // GET: api/Medicine/name/{medicineName}
        [HttpGet("GetByName/{medicineName}")]
        public async Task<IActionResult> GetMedicineByName(string medicineName)
        {
            var result = await _medicineService.GetMedicineByName(medicineName);
            if (result.Result is NotFoundResult)
            {
                return NotFound();
            }
            return Ok(result.Value);
        }

        // GET: api/Medicine/category/{categoryName}
        [HttpGet("GetByCategory/{categoryName}")]
        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByCategory(string categoryName)
        {
            var result = await _medicineService.GetMedicineByCategory(categoryName);
            Console.WriteLine(result.Result);
            if (result.Result is NotFoundResult)
            {
                return null;
            }
           return result;
        }

        [HttpGet("GetMedicineByPharmacyId/{pharmacyid}")]
        public async Task<IActionResult> GetMedicineByPharmacyId(int pharmacyid)
        {
            var result = await _medicineService.GetMedicineByPharmacyId(pharmacyid);
            if (result.Result is NotFoundResult)
            {
                return NotFound();
            }
            return Ok(result.Value);
        }
    }
}
