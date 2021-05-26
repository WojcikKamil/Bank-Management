using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    internal static class EnvironmentVariables
    {
        public const string DatabaseConnectionStringEnvVarName = "DB_CONNECTION_STRING";
        public const string CorsWhitelistedAddress = "CORS_WHITELISTED_ADDRESS";
    }
}
