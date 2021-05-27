using System;
using System.Collections.Generic;

#nullable disable

namespace DataLayer.Models
{
    public partial class Account
    {
        public Account()
        {
            TransactionReceivers = new HashSet<Transaction>();
            TransactionSenders = new HashSet<Transaction>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Number { get; set; }
        public decimal? Balance { get; set; }

        public virtual ICollection<Transaction> TransactionReceivers { get; set; }
        public virtual ICollection<Transaction> TransactionSenders { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
