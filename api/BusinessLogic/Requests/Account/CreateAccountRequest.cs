using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Requests.Account
{
    public class CreateAccountRequest
    {
        [Required]
        public string Number { get; set; }

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
