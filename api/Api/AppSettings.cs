using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class AppSettings
    {
        public int MasterUserPort { get; set; }
        public int MasterAccountPort { get; set; }
        public int RemovedUserPort { get; set; }
        public int RemovedAccountPort { get; set; }
    }
}
