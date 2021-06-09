using DataLayer;
using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Initializer
{
    public class DbInitializer : IDbInitializer
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IOptions<AppSettings> _appSettings;

        public DbInitializer(IServiceScopeFactory scopeFactory, IOptions<AppSettings> appSettings)
        {
            _scopeFactory = scopeFactory;
            _appSettings = appSettings;
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
                using (BmDbContext context = serviceScope.ServiceProvider.GetService<BmDbContext>())
                using (IDbContextTransaction transaction = context.Database.BeginTransaction())
                {
                    await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[User] ON");

                    AddMasterUser(context);
                    AddRemovedUserPlaceholder(context);

                    await context.SaveChangesAsync();

                    await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[User] OFF");
                    await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[Account] ON");

                    AddMasterAccount(context);
                    AddRemovedAccountPlaceholder(context);

                    await context.SaveChangesAsync();

                    await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[Account] OFF");

                    await transaction.CommitAsync();
                }
            }
        }

        private void AddMasterUser(BmDbContext context)
        {
            if (!context.Users.Any(a => a.Id == _appSettings.Value.masterUserPort))
            {
                context.Users.Add(new User
                {
                    Id = _appSettings.Value.masterUserPort,
                    IsBanker = true,
                    Login = "admin",
                    Password = "0000",
                    Name = "Bank",
                    Surname = "Manager",
                });
            }
        }

        private void AddMasterAccount (BmDbContext context)
        {
            if (!context.Accounts.Any(a => a.Id == _appSettings.Value.masterAccountPort))
            {
                context.Accounts.Add(new Account
                {
                    Id = _appSettings.Value.masterAccountPort,
                    Balance = 100000000000,
                    Number = "Master",
                    UserId = 60079
                });
            }
        }

        private void AddRemovedUserPlaceholder (BmDbContext context)
        {
            if (!context.Users.Any(a => a.Id == _appSettings.Value.removedUserPort))
            {
                context.Users.Add(new User
                {
                    Id = _appSettings.Value.removedUserPort,
                    IsBanker = true,
                    Login = "admin_removed",
                    Password = "0000",
                    Name = "REMOVED",
                    Surname = "USER",
                });
            }
        }

        private void AddRemovedAccountPlaceholder (BmDbContext context)
        {
            if (!context.Accounts.Any(a => a.Id == _appSettings.Value.removedAccountPort))
            {
                context.Accounts.Add(new Account
                {
                    Id = _appSettings.Value.removedAccountPort,
                    Balance = 0,
                    Number = "REMOVED",
                    UserId = _appSettings.Value.removedUserPort
                });
            }
        }
    }
}
