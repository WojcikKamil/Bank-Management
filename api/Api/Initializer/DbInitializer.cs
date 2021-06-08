using DataLayer;
using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Initializer
{
    public class DbInitializer : IDbInitializer
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public DbInitializer(IServiceScopeFactory scopeFactory)
        {
            this._scopeFactory = scopeFactory;
        }

        public void Initialize()
        {
            using (var serviceScope = _scopeFactory.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<BmDbContext>())
                {
                    context.Database.Migrate();
                }
            }
        }

        public async void SeedDataAsync()
        {
            using (var serviceScope = _scopeFactory.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<BmDbContext>())
                using (var transaction = context.Database.BeginTransaction())
                {
                    if (!context.Users.Any(a => a.Id == 60079))
                    {
                        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[User] ON");

                        context.Users.Add(new User
                        {
                            Id = 60079,
                            IsBanker = true,
                            Login = "admin",
                            Password = "924E3f0c575578E855042E4282",
                            Name = "Bank",
                            Surname = "Manager",
                        });

                        context.SaveChanges();

                        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[User] OFF");

                        transaction.Commit();
                    }

                    if (!context.Accounts.Any(a => a.Id == 60095))
                    {
                        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[Account] ON");

                        context.Accounts.Add(new Account
                        {
                            Id = 60095,
                            Balance = 100000000000,
                            Number = "Master",
                            UserId = 60079
                        });

                        context.SaveChanges();

                        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[Account] OFF");

                        transaction.Commit();
                    }
                }
            }
        }
    }
}
