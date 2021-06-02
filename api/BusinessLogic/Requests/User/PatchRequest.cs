using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Requests.User
{
    public class PatchRequest
    {
        [Required]
        public int Id { get; set; }

        public string Property { get; set; }

        public string Value { get; set; }
    }
}
