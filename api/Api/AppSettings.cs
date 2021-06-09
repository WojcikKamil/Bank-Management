using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class AppSettings
    {
        public int masterUserPort { get; set; }
        public int masterAccountPort { get; set; }
        public int removedUserPort { get; set; }
        public int removedAccountPort { get; set; }
    }
}
