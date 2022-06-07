using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CriminalStatus
{
    internal static class CriminalStatusServiceEmulator
    {
        public static List<int> LoadCriminalRecords()
        {
            return new List<int>
            {
                999999,
                111111,
                123456,
                123123
            };
        }
    }
}
