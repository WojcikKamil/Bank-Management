using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Utils
{
    public class Result<TValue, TError>
    {
        public TValue Value { get; set; }
        
        public TError Error { get; set; }

        public bool isError { get; set; }

        public Result(TValue value)
        {
            Value = value;
        }

        public Result(TError error)
        {
            Error = error;
            isError = true;
        }
    }
}
