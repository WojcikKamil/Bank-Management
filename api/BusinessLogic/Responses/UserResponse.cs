using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Responses
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsBanker { get; set; }
        public string Password { get; set; }
    }
}
