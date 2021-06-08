using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Responses
{
    public class TransactionResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Value { get; set; }
        public DateTime Timestamp { get; set; }
        public string SenderNumber { get; set; }
        public string ReceiverNumber { get; set; }
    }
}
