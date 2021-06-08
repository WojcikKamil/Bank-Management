using BusinessLogic.Errors;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Mappers
{
    class TransactionMapper
    {
        public static Result<TransactionResponse, TransactionError> FromModelToResult(Transaction transaction)
            => new Result<TransactionResponse, TransactionError>(new TransactionResponse
            {
                Id = transaction.Id,
                ReceiverNumber = transaction.Receiver.Number,
                SenderNumber = transaction.Receiver.Number,
                Timestamp = transaction.Timestamp,
                Title = transaction.Title,
                Value = transaction.Value,
            });

        public static TransactionResponse FromModelToResponse(Transaction transaction)
            => new TransactionResponse
            {
                Id = transaction.Id,
                ReceiverNumber = transaction.Receiver.Number,
                SenderNumber = transaction.Receiver.Number,
                Timestamp = transaction.Timestamp,
                Title = transaction.Title,
                Value = transaction.Value,
            };
    }
}
