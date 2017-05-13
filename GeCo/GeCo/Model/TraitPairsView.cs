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
            Trait1 = traitOne;
            Trait2 = traitTwo;
            CM = cM;
        }

        public string Trait1 { get; set; }
        public string Trait2 { get; set; }

        public int CM { get; set; }
    }
}
