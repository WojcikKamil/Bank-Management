using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Responses
{
    public class AccountResponse
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public decimal Balance { get; set; }
        public string OwnerCredentials { get; set; }
    }
}
