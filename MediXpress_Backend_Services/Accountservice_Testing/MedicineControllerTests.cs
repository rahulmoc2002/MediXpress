using NUnit.Framework;
using Moq;
using MediXpress_Medicine_Service_Api.Controllers;
using MediXpress_Medicine_Service_Api.Services;
using MediXpress_Medicine_Service_Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MedicineService_Testing
{
    [TestFixture]
    public class MedicineControllerTests
    {
        private MedicineController _controller;
        private Mock<IMedicineServices> _mockService;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<IMedicineServices>();
            _controller = new MedicineController(_mockService.Object);
        }

        

        
        [Test]
        public async Task GetMedicineById_Successful_ReturnsOk()
        {
            // Arrange
            var id = 1;
            var medicine = new Medicine();
            _mockService.Setup(service => service.GetMedicinebyId(id)).ReturnsAsync(new ActionResult<Medicine>(medicine));

            // Act
            var result = await _controller.GetMedicineById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(medicine, okResult.Value);
        }

        [Test]
        public async Task GetMedicineById_NotFound_ReturnsNotFound()
        {
            // Arrange
            var id = 1;
            _mockService.Setup(service => service.GetMedicinebyId(id)).ReturnsAsync(new ActionResult<Medicine>(new NotFoundResult()));

            // Act
            var result = await _controller.GetMedicineById(id);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task GetAllMedicine_ReturnsOk()
        {
            // Arrange
            var medicines = new List<Medicine> { new Medicine(), new Medicine() };
            _mockService.Setup(service => service.GetAllMedicine()).ReturnsAsync(medicines);

            // Act
            var result = await _controller.GetAllMedicine();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(medicines, okResult.Value);
        }

        

        

        [Test]
        public async Task GetMedicineByCategory_Successful_ReturnsOk()
        {
            // Arrange
            var category = "Painkillers";
            var medicines = new List<Medicine> { new Medicine(), new Medicine() };
            _mockService.Setup(service => service.GetMedicineByCategory(category)).ReturnsAsync(new ActionResult<IEnumerable<Medicine>>(medicines));

            // Act
            var result = await _controller.GetMedicineByCategory(category);

            // Assert
            Assert.IsInstanceOf<ActionResult<IEnumerable<Medicine>>>(result);
            var actionResult = result.Result as OkObjectResult;
            Assert.AreEqual(medicines, actionResult.Value);
        }

        [Test]
        public async Task GetMedicineByCategory_NotFound_ReturnsNotFound()
        {
            // Arrange
            var category = "NonexistentCategory";
            _mockService.Setup(service => service.GetMedicineByCategory(category)).ReturnsAsync(new ActionResult<IEnumerable<Medicine>>(new NotFoundResult()));

            // Act
            var result = await _controller.GetMedicineByCategory(category);

            // Assert
            Assert.IsNull(result);
        }

        

        
    }
}
