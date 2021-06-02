using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Requests.User
{
    public class PatchUserRequest
    {
        [Required]
        public int Id { get; set; }

        public string Login { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Password { get; set; }
    }
}
