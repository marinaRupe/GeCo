using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class TraitView
    {
        public TraitView(string genotype, string phenotype, string type)
        {
            Genotype = genotype;
            Phenotype = phenotype;
            Type = type;
        }

        public string Genotype { get; set; }
        public string Phenotype { get; set; }
        public string Type { get; set; }
    }
}
