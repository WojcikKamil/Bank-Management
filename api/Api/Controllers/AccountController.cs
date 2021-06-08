using BusinessLogic.Errors;
using BusinessLogic.Responses;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IReadOnlyCollection<AccountResponse>>> GetAccounts(int userId)
        {
            var result = await _accountService.GetAccounts(userId);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AccountResponse>> RemoveAccount(int id)
        {
            var result = await _accountService.RemoveAccount(id);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        private ActionResult HandleError(AccountError error)
        {
            return error switch
            {
                AccountError.AccountNotFound => NotFound("Account does not exist"),
                _ => throw new InvalidOperationException($"Invalid error: {error}")
            };
        }
    }
}
