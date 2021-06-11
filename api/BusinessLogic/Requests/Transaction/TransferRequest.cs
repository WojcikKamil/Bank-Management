using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Requests.Transaction
{
    public class TransferRequest
    {
        [Required]
        public string SenderNumber { get; set; }

        [Required]
        public string ReceiverNumber { get; set; }

        [Required]
        public decimal Amount { get; set; }
        
        [Required]
        public string Title { get; set; }
    }
}
