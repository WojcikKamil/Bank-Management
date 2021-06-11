using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Requests.Transaction
{
    public class GrantRequest
    {
        [Required]
        public int RequesterUserId { get; set; }

        [Required]
        public string AccountNumber { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Title { get; set; }
    }
}
