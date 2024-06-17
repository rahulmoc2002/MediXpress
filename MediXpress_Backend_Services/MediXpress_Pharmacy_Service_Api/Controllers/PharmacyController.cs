using MediXpress_Pharmacy_Service_Api.Models;
using MediXpress_Pharmacy_Service_Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace MediXpress_Pharmacy_Service_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmacyController : ControllerBase
    {
        private readonly IPharmacyServices _pharmacyService;
        public PharmacyController(IPharmacyServices pharmacyService)
        {
            _pharmacyService = pharmacyService;
        }
        // GET: api/Pharmacy
        [HttpGet("GetAll")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult<IEnumerable<Pharmacy>>> GetAllPharmacies()
        {
            var pharmacies = await _pharmacyService.GetAllPharmacies();
            return Ok(pharmacies);
        }
        // GET: api/Pharmacy/name
        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<Pharmacy>>> GetPharmacyByName(string name)
        {
            var pharmacies = await _pharmacyService.GetPharmacyByName(name);
            if (pharmacies.Value == null || !pharmacies.Value.Any())
            {
                return NotFound();
            }
            return Ok(pharmacies.Value);
        }
        // POST: api/Pharmacy
        [HttpPost("AddPharmacy")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> CreatePharmacy([FromBody] Pharmacy pharmacy)
        {
            var result = await _pharmacyService.CreatePharmacy(pharmacy);
            if (result.Value)
            {
                return CreatedAtAction(nameof(GetPharmacyByName), new { name = pharmacy.PharmacyName }, pharmacy);
            }
            return BadRequest();
        }
        // PUT: api/Pharmacy/id
        [HttpPut("UpdateById/{id}")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> EditPharmacy(int id, [FromBody] Pharmacy pharmacy)
        {
            var result = await _pharmacyService.EditPharmacy(id, pharmacy);
            if (result.Value)
            {
                return NoContent();
            }
            return NotFound();
        }
        // DELETE: api/Pharmacy/id
        [HttpDelete("DeleteById/{id}")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> DeletePharmacy(int id)
        {
            var result = await _pharmacyService.DeletePharmacy(id);
            if (result.Value)
            {
                return NoContent();
            }
            return NotFound();
        }
        //get All pharmacy Details For Seller by Seller Id
        [HttpGet("GetSellerPharmacyBySellerId/{sellerId}")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> GetSellerPharmacyBySellerId(int sellerId)
        {
            var result = await _pharmacyService.GetSellerPharmacyBySellerId(sellerId);
            if (result.Value != null)
            {
                return Ok(result.Value);
            }
            return BadRequest("No Pharmacy Found");
        }
    }
}










