using BusinessLogic.Errors;
using BusinessLogic.Mappers;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using DataLayer.Models;
using DataLayer.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        public AccountService(IAccountRepository accountRepository, IUserRepository userRepository)
        {
            _accountRepository = accountRepository;
            _userRepository = userRepository;
        }

        public async Task<Result<IReadOnlyCollection<AccountResponse>, AccountError>> GetAccounts(int userId)
        {
            User user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                return new Result<IReadOnlyCollection<AccountResponse>, AccountError>(AccountError.OwnerDoesNotExist);

            string userCredentials = $"{user.Name} {user.Surname}";

            List<Account> repoResponse = await _accountRepository.GetAccountsAsync();
            var serviceResponse = repoResponse
                .FindAll(a => a.UserId == userId)
                .Select(a => AccountMapper.FromModelToResponse(a, userCredentials))
                .ToList();


            return new Result<IReadOnlyCollection<AccountResponse>, AccountError>(serviceResponse);
        }

        public async Task<Result<AccountResponse, AccountError>> RemoveAccount(int id, int accountPlaceholderId)
        {
            if(_accountRepository.GetByIdAsync(id) == null)
                return new Result<AccountResponse, AccountError>(AccountError.AccountNotFound);

            Account accountToBeRemoved = _accountRepository.Delete(id, accountPlaceholderId);

            User user = await _userRepository.GetByIdAsync(accountToBeRemoved.UserId);
            string userCredentials = $"{user.Name} {user.Surname}";

            return AccountMapper.FromModelToResult(accountToBeRemoved, userCredentials);
        }
    }
}
