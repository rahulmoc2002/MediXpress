using MediXpress_Pharmacy_Service_Api.Data;
using MediXpress_Pharmacy_Service_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediXpress_Pharmacy_Service_Api.Services
{
    public class PharmacyService : IPharmacyServices
    {
        private readonly PharmacyDbContext _context;

        public PharmacyService(PharmacyDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<bool>> CreatePharmacy(Pharmacy pharmacy)
        {
            _context.Pharmacies.Add(pharmacy);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<bool>> DeletePharmacy(int id)
        {
            var pharmacy = await _context.Pharmacies.FindAsync(id);
            if (pharmacy == null)
            {
                return new NotFoundResult();
            }

            _context.Pharmacies.Remove(pharmacy);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<bool>> EditPharmacy(int id, Pharmacy updatedPharmacy)
        {
            var pharmacy = await _context.Pharmacies.FindAsync(id);
            if (pharmacy == null)
            {
                return new NotFoundResult();
            }

            pharmacy.PharmacyName = updatedPharmacy.PharmacyName;
            pharmacy.LicenseNumber = updatedPharmacy.LicenseNumber;
            pharmacy.Address = updatedPharmacy.Address;
            pharmacy.City = updatedPharmacy.City;
            pharmacy.State = updatedPharmacy.State;
            pharmacy.PostalCode = updatedPharmacy.PostalCode;
            pharmacy.Phonenumber = updatedPharmacy.Phonenumber;

            _context.Pharmacies.Update(pharmacy);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Pharmacy>> GetAllPharmacies()
        {
            return await _context.Pharmacies.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<Pharmacy>>> GetPharmacyByName(string pharmacyName)
        {
            var pharmacies = await _context.Pharmacies
                .Where(p => p.PharmacyName.Contains(pharmacyName))
                .ToListAsync();

            if (pharmacies == null || pharmacies.Count == 0)
            {
                return new NotFoundResult();
            }

            return pharmacies;
        }

        public async Task<ActionResult<Pharmacy>> GetSellerPharmacyBySellerId(int sellerId)
        {
            var pharmacies = await _context.Pharmacies.FirstOrDefaultAsync(x=>x.UserId == sellerId);
            return pharmacies;
        }
    }
}
