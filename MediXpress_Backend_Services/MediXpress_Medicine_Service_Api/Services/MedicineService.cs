using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediXpress_Medicine_Service_Api.Models;
using MediXpress_Medicine_Service_Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace MediXpress_Medicine_Service_Api.Services
{
    public class MedicineService : IMedicineServices
    {
        private readonly MedicineDbContext _context;

        public MedicineService(MedicineDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<bool>> CreateMedicine(Medicine medicine)
        {
            _context.Medicines.Add(medicine);
            await _context.SaveChangesAsync();
            return  true;
        }

        public async Task<ActionResult<bool>> DeleteMedicine(int id)
        {
            var medicine = await _context.Medicines.FindAsync(id);
            if (medicine == null)
            {
                return new NotFoundObjectResult(false);
            }

            _context.Medicines.Remove(medicine);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<bool>> EditMedicine(int id, Medicine updatedMedicine)
        {
            if (id != updatedMedicine.Id)
            {
                return new BadRequestObjectResult(false);
            }

            _context.Entry(updatedMedicine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicineExists(id))
                {
                    return new NotFoundObjectResult(false);
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        public async Task<ActionResult<Medicine>> GetMedicinebyId(int id)
        {
            var medicine = await _context.Medicines.FindAsync(id);

            if (medicine == null)
            {
                return new NotFoundResult();
            }

            return medicine;
        }

        public async Task<IEnumerable<Medicine>> GetAllMedicine()
        {
            return await _context.Medicines.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByName(string medicineName)
        {
            var medicines = await _context.Medicines
                .Where(m => m.MedName.Contains(medicineName))
                .ToListAsync();

            if (medicines == null || !medicines.Any())
            {
                return new NotFoundObjectResult(Enumerable.Empty<Medicine>());
            }

            return new OkObjectResult(medicines);
        }

        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByCategory(string categoryName)
        {
            var medicines = await _context.Medicines
                .Include(m => m.Category)
                .Where(m => m.Category.CatName == categoryName)
                .ToListAsync();

            if (!medicines.Any())
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(medicines);
        }

        private bool MedicineExists(int id)
        {
            return _context.Medicines.Any(e => e.Id == id);
        }

        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByPharmacyId(int pharmacyId)
        {
            var mymedicines=await _context.Medicines.Where(x=>x.PharmacyId == pharmacyId).ToListAsync();
            Console.WriteLine(mymedicines);
            return mymedicines;
        }
    }
}
