using BusinessLogic.Errors;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Mappers
{
    class AccountMapper
    {
        public static Result<AccountResponse, AccountError> FromModelToResult(Account account, string ownerCredentials)
            => new Result<AccountResponse, AccountError>(new AccountResponse
            {
                Id = account.Id,
                Balance = (decimal)account.Balance,
                Number = account.Number,
                OwnerCredentials = ownerCredentials
            });

        public static AccountResponse FromModelToResponse(Account account, string ownerCredentials)
            => new AccountResponse
            {
                Id = account.Id,
                Balance = (decimal)account.Balance,
                Number = account.Number,
                OwnerCredentials = ownerCredentials
            };
    }
}
