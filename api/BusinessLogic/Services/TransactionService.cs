using BusinessLogic.Errors;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataLayer.Models;
using System.Linq;
using BusinessLogic.Mappers;
using BusinessLogic.Requests.Transaction;

namespace BusinessLogic.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;

        public TransactionService(
            ITransactionRepository transactionRepository,
            IAccountRepository accountRepository,
            IUserRepository userRepository
        )
        {
            _transactionRepository = transactionRepository;
            _accountRepository = accountRepository;
            _userRepository = userRepository;
        }

        public async Task<Result<IReadOnlyCollection<TransactionResponse>, TransactionError>> GetTransactionsAsync(int accountId)
        {
            List<Transaction> repositoryResponse = await _transactionRepository.GetTransactionsAsync();
            TransactionResponse[] tasks = await Task.WhenAll(
                    repositoryResponse
                        .FindAll(t => t.SenderId == accountId || t.ReceiverId == accountId)
                        .Select(t => InitializeMapper(t))
                );

            List<TransactionResponse> serviceResponse = tasks.Where(t => t != null).ToList();

            return new Result<IReadOnlyCollection<TransactionResponse>, TransactionError>(serviceResponse);
        }

        public async Task<Result<TransactionResponse, TransactionError>> Transfer(TransferRequest request)
        {
            List<Account> accounts = await _accountRepository.GetAccountsAsync();
            Account sender = accounts.Find(a => a.Number == request.SenderNumber);
            Account receiver = accounts.Find(a => a.Number == request.ReceiverNumber);

            decimal senderBalanceAfter = (decimal)(sender.Balance - request.Amount);
            if (senderBalanceAfter < 0)
            {
                return new Result<TransactionResponse, TransactionError>(TransactionError.NotEnoughFunds);
            }

            sender.Balance -= request.Amount;
            receiver.Balance += request.Amount;

            _accountRepository.Update(sender);
            _accountRepository.Update(receiver);

            Transaction newTransaction = _transactionRepository.Create(new Transaction
            {
                ReceiverId = receiver.Id,
                SenderId = sender.Id,
                Timestamp = DateTime.Now,
                Title = request.Title,
                Value = request.Amount
            });

            return TransactionMapper.FromModelToResult(newTransaction, receiver.Number, sender.Number);
        }

        public async Task<Result<TransactionResponse, TransactionError>> Grant(GrantRequest request, int masterAccountId)
        {
            User requester = await _userRepository.GetByIdAsync(request.RequesterUserId);
            if (!requester.IsBanker)
            {
                return new Result<TransactionResponse, TransactionError>(TransactionError.UnauthorizedOperation);
            }

            List<Account> accounts = await _accountRepository.GetAccountsAsync();

            Account receiverAccount = accounts.Find(a => a.Number == request.AccountNumber);

            receiverAccount.Balance += request.Amount;

            _accountRepository.Update(receiverAccount);

            Transaction newTransaction = _transactionRepository.Create(new Transaction
            {
                ReceiverId = receiverAccount.Id,
                SenderId = masterAccountId,
                Timestamp = DateTime.Now,
                Title = request.Title,
                Value = request.Amount
            });

            Account master = await _accountRepository.GetByIdAsync(masterAccountId);

            return TransactionMapper.FromModelToResult(newTransaction, receiverAccount.Number, master.Number);
        }

        private async Task<TransactionResponse> InitializeMapper(Transaction transaction)
        {
            Account sender = await _accountRepository.GetByIdAsync(transaction.SenderId);
            Account receiver = await _accountRepository.GetByIdAsync(transaction.ReceiverId);

            return TransactionMapper.FromModelToResponse(transaction, receiver.Number, sender.Number);
        }

    }
}
