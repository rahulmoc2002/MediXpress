using MediXpress_Medicine_Service_Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace MediXpress_Medicine_Service_Api.Services
{
    public interface IMedicineServices
    {
        Task<ActionResult<bool>> CreateMedicine(Medicine medicine);
        Task<ActionResult<bool>> DeleteMedicine(int id);
        Task<ActionResult<bool>> EditMedicine(int id, Medicine updatedMedicine);

        Task<ActionResult<Medicine>> GetMedicinebyId(int id);
        Task<IEnumerable<Medicine>> GetAllMedicine();
        Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByName(string medicineName);

        Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByCategory(string categoryName);

        Task<ActionResult<IEnumerable<Medicine>>> GetMedicineByPharmacyId(int pharmacyId); 


    }
}
