using MediXpress_Pharmacy_Service_Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace MediXpress_Pharmacy_Service_Api.Services
{
    public interface IPharmacyServices
    {
        Task<ActionResult<bool>> CreatePharmacy(Pharmacy pharmacy);
        Task<ActionResult<bool>> DeletePharmacy(int id);
        Task<ActionResult<bool>> EditPharmacy(int id, Pharmacy updatedPharmacy);
        Task<IEnumerable<Pharmacy>> GetAllPharmacies();
        Task<ActionResult<IEnumerable<Pharmacy>>> GetPharmacyByName(string pharmacyName);

        Task <ActionResult<Pharmacy>> GetSellerPharmacyBySellerId ( int sellerId);    
    }
}
