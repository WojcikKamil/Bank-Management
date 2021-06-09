using BusinessLogic.Errors;
using BusinessLogic.Requests.Account;
using BusinessLogic.Responses;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IOptions<AppSettings> _options;
        public AccountController(IAccountService accountService, IOptions<AppSettings> options)
        {
            _accountService = accountService;
            _options = options;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IReadOnlyCollection<AccountResponse>>> GetAccounts(int userId)
        {
            var result = await _accountService.GetAccounts(userId);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpPost]
        public async Task<ActionResult<AccountResponse>> Create([FromBody] CreateAccountRequest request)
        {
            var result = await _accountService.Create(request);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AccountResponse>> Remove(int id)
        {
            var result = await _accountService.Remove(id, _options.Value.RemovedAccountPort);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        private ActionResult HandleError(AccountError error)
        {
            return error switch
            {
                AccountError.AccountNotFound => NotFound("Account does not exist"),
                AccountError.OwnerDoesNotExist => BadRequest("Owner of the account does not exist"),
                _ => throw new InvalidOperationException($"Invalid error: {error}")
            };
        }
    }
}
