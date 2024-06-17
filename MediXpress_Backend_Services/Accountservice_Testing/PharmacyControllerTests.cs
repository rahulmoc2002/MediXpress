using NUnit.Framework;
using Moq;
using MediXpress_Pharmacy_Service_Api.Controllers;
using MediXpress_Pharmacy_Service_Api.Services;
using MediXpress_Pharmacy_Service_Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PharmacyService_Testing
{
    [TestFixture]
    public class PharmacyControllerTests
    {
        private PharmacyController _controller;
        private Mock<IPharmacyServices> _mockService;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<IPharmacyServices>();
            _controller = new PharmacyController(_mockService.Object);
        }

        [Test]
        public async Task GetAllPharmacies_ReturnsOk()
        {
            // Arrange
            var pharmacies = new List<Pharmacy> { new Pharmacy(), new Pharmacy() };
            _mockService.Setup(service => service.GetAllPharmacies()).ReturnsAsync(pharmacies);

            // Act
            var result = await _controller.GetAllPharmacies();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(pharmacies, okResult.Value);
        }

        [Test]
        public async Task GetPharmacyByName_ReturnsOk()
        {
            // Arrange
            var name = "PharmacyName";
            var pharmacies = new List<Pharmacy> { new Pharmacy() };
            _mockService.Setup(service => service.GetPharmacyByName(name)).ReturnsAsync(new ActionResult<IEnumerable<Pharmacy>>(pharmacies));

            // Act
            var result = await _controller.GetPharmacyByName(name);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(pharmacies, okResult.Value);
        }

        [Test]
        public async Task GetPharmacyByName_ReturnsNotFound()
        {
            // Arrange
            var name = "Nonexistent";
            _mockService.Setup(service => service.GetPharmacyByName(name)).ReturnsAsync(new ActionResult<IEnumerable<Pharmacy>>(new List<Pharmacy>()));

            // Act
            var result = await _controller.GetPharmacyByName(name);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

    }
}