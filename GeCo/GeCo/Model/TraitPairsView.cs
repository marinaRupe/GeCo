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
            TraitOne = traitOne;
            TraitTwo = traitTwo;
            CM = cM;
        }

        public string TraitOne { get; set; }
        public string TraitTwo { get; set; }

        public int CM { get; set; }
    }
}
