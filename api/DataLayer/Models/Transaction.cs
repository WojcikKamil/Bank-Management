using System;
using System.Collections.Generic;

#nullable disable

namespace DataLayer.Models
{
    public partial class Transaction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Value { get; set; }
        public DateTime Timestamp { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }

        public virtual Account Receiver { get; set; }
        public virtual Account Sender { get; set; }
    }
}
