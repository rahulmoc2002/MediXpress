using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
using Moq.Language.Flow;
using MediXpress_Account_Service_Api.Models;
using Eduhub.UserManagement.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Medixpress.UserManagement.API.Services;


namespace Accountservice_Testing
{
    [TestFixture]
    public class AccountsControllerTests
    {
        private AccountsController _controller;
        private Mock<IAccountService> _mockService;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<IAccountService>();
            _controller = new AccountsController(_mockService.Object);
        }

        [Test]
        public async Task Registration_UserCreatedSuccessfully_ReturnsOk()
        {
            // Arrange
            var user = new User();
            _mockService.Setup(service => service.Registration(user)).ReturnsAsync((1, "Success"));

            // Act
            var result = await _controller.Registration(user);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("User Created Successfully", okResult.Value);
        }

        [Test]
        public async Task Registration_UserCreationFailed_ReturnsBadRequest()
        {
            // Arrange
            var user = new User();
            _mockService.Setup(service => service.Registration(user)).ReturnsAsync((0, "Error"));

            // Act
            var result = await _controller.Registration(user);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("Error", badRequestResult.Value);
        }

        [Test]
        public async Task Login_Successful_ReturnsOk()
        {
            // Arrange
            var loginData = new LoginData();
            var loginResponse = new LoginResponse { Status = 1, Token = "token", CurrentUser = new User() };
            _mockService.Setup(service => service.Login(loginData)).ReturnsAsync((1, "token", new User()));

            // Act
            var result = await _controller.Login(loginData);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsInstanceOf<LoginResponse>(okResult.Value);
        }

        
    }

}
