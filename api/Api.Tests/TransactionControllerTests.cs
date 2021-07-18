using BusinessLogic.Requests.Transaction;
using DataLayer;
using DataLayer.Models;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;
using System.Net;
using System.Text;

namespace Api.Tests
{
    public class TransactionControllerTests : IClassFixture<BmWebApplicationFactory<Startup>>
    {
        private readonly BmWebApplicationFactory<Startup> _factory;
        private readonly HttpClient _httpClient;

        public TransactionControllerTests(BmWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _httpClient = factory.CreateDefaultClient();
        }

        [Fact]
        public async Task Transaction_with_insufficient_funds_Should_be_declined()
        {
            string transactionUrl = "api/transactions/transfer";

            // Arrange
            Account sender = new Account
            {
                Balance = 0,
                Number = "1111111",
                UserId = 60095,
            };

            Account receiver = new Account
            {
                Balance = 0,
                Number = "2222222",
                UserId = 60095,
            };

            using (var scope = _factory.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<BmDbContext>();
                await context.AddRangeAsync(sender, receiver);
                await context.SaveChangesAsync();
            }

            TransferRequest transferRequest = new TransferRequest
            {
                ReceiverNumber = "2222222",
                Amount = 100,
                SenderNumber = "1111111",
                Title = "Test",
            };

            // Act
            var response = await _httpClient.PatchAsync(transactionUrl, new StringContent(JsonConvert.SerializeObject(transferRequest), Encoding.UTF8, "application/json"));

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }
    }
}
