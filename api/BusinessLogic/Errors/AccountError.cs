using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Errors
{
    public enum AccountError
    {
        None = 0,
        AccountNotFound = 1,
        OwnerDoesNotExist = 2,
        NameAlreadyTaken = 3,
    }
}
