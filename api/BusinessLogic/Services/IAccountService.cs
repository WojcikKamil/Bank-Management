using BusinessLogic.Errors;
using BusinessLogic.Requests.Account;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface IAccountService
    {
        Task<Result<IReadOnlyCollection<AccountResponse>, AccountError>> GetAccounts(int userId);

        Task<Result<AccountResponse, AccountError>> Create(CreateAccountRequest request);

        Task<Result<AccountResponse, AccountError>> Remove(int id, int accountPlaceholderId);
    }
}