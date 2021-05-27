using System;
using System.Collections.Generic;

#nullable disable

namespace DataLayer.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsBanker { get; set; }
        public string Password { get; set; }
        public int AccountId { get; set; }

        public virtual Account Account { get; set; }
    }
}
