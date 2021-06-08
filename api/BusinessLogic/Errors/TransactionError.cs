using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Errors
{
    public enum TransactionError
    {
        None = 0,

        NotEnoughFunds = 1,

        UnauthorizedOperation = 2,
    }
}
