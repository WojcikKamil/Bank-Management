using BusinessLogic.Errors;
using BusinessLogic.Requests.Transaction;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface ITransactionService
    {
        Task<Result<IReadOnlyCollection<TransactionResponse>, TransactionError>> GetTransactionsAsync(int accountId);
        Task<Result<TransactionResponse, TransactionError>> Grant(GrantRequest request);
        Task<Result<TransactionResponse, TransactionError>> Transfer(TransferRequest request);
    }
}