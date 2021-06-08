using DataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public interface ITransactionRepository
    {
        Transaction Create(Transaction transaction);
        Task<List<Transaction>> GetTransactionsAsync();
    }
}