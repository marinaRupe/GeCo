using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class TraitPairsView
    {
        public TraitPairsView(string traitOne, string traitTwo, int cM)
        {
            trait1 = traitOne;
            trait2 = traitTwo;
            cm = cM;
        }

        public string trait1 { get; set; }
        public string trait2 { get; set; }

        public int cm { get; set; }
    }
}
