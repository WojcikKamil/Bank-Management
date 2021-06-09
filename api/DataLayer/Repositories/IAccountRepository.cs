using DataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public interface IAccountRepository
    {
        Account Create(Account Account);
        Account Delete(int accountId, int accountPlaceholderId);
        Task<List<Account>> GetAccountsAsync();
        Task<Account> GetByIdAsync(int id);
        Account Update(Account AccountToUpdate);
    }
}