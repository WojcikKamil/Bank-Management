using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Errors
{
    public enum UserError
    {
        None = 0,

        UserAlreadyExists = 1,
        
        UserNotFound = 2,

        InvalidInput = 3
    }
}
