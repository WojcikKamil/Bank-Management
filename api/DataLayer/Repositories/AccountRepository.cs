using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public class AccountRepository : Repository, IAccountRepository
    {
        public AccountRepository(BmDbContext context) : base(context) { }

        public Account Create(Account Account)
        {
            _context.Accounts.Add(Account);
            _context.SaveChanges();

            return Account;
        }

        public async Task<Account> GetByIdAsync(int id)
        {
            return await _context
                .Accounts
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<List<Account>> GetAccountsAsync()
        {

            return await _context
                .Accounts
                .AsNoTracking()
                .ToListAsync();
        }

        public Account Update(Account AccountToUpdate)
        {
            _context.Update(AccountToUpdate);
            _context.SaveChanges();

            return AccountToUpdate;
        }

        public Account Delete(int accountId, int accountPlaceholderId)
        {
            Account AccountToDelete = _context
                .Accounts
                .FirstOrDefault(u => u.Id == accountId);

            if (AccountToDelete == null)
                return null;

            _context.Transactions
                    .Where(t => t.SenderId == accountId || t.ReceiverId == accountId)
                    .ToList()
                    .ForEach(transaction =>
                    {
                        if (transaction.SenderId == accountId)
                            transaction.SenderId = accountPlaceholderId;
                        else if (transaction.ReceiverId == accountId)
                            transaction.ReceiverId = accountPlaceholderId;
                    });

            _context.Accounts.Remove(AccountToDelete);
            _context.SaveChanges();

            return AccountToDelete;
        }
    }
}
