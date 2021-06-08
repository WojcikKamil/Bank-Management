using BusinessLogic.Errors;
using BusinessLogic.Requests.Transaction;
using BusinessLogic.Responses;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/transactions")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<TransactionResponse>>> GetTransactions(int accountId)
        {
            var result = await _transactionService.GetTransactionsAsync(accountId);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpPatch("transfer")]
        public async Task<ActionResult<TransactionResponse>> TransferFunds([FromBody] TransferRequest request)
        {
            var result = await _transactionService.Transfer(request);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpPatch("grant")]
        public async Task<ActionResult<TransactionResponse>> GrantFunds([FromBody] GrantRequest request)
        {
            var result = await _transactionService.Grant(request);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        private ActionResult HandleError(TransactionError error)
        {
            return error switch
            {
                TransactionError.NotEnoughFunds => BadRequest("Not enough funds to perform that operation."),
                TransactionError.UnauthorizedOperation => Unauthorized("You are not authorized to perform that operation"),
               _ => throw new InvalidOperationException($"Invalid error: {error}")
            };
        }
    }
}

