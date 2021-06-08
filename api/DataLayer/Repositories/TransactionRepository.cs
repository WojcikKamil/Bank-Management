using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public class TransactionRepository : Repository, ITransactionRepository
    {
        public TransactionRepository(BmDbContext context) : base(context) { }

        public Transaction Create(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();

            return transaction;
        }

        public async Task<List<Transaction>> GetTransactionsAsync()
        {
            return await _context
                .Transactions
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
