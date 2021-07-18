using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore;
using Microsoft.Extensions.Configuration;

namespace Api.Tests
{
    public class BmWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override IWebHostBuilder CreateWebHostBuilder() =>
            WebHost
                .CreateDefaultBuilder()
                .UseStartup<TStartup>()
                .ConfigureAppConfiguration((context, builder) =>
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings-integration.json");
                    builder.AddJsonFile(path);
                });
    }
}
