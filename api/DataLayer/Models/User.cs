using System;
using System.Collections.Generic;

#nullable disable

namespace DataLayer.Models
{
    public partial class User
    {
        public User()
        {
            Accounts = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsBanker { get; set; }
        public string Password { get; set; }
        public int AccountId { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
