using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class TraitView
    {
        public TraitView(string genotype, string phenotype, string type, string imageUrl)
        {
            Genotype = genotype;
            Phenotype = phenotype;
            Type = type;
            ImageUrl = imageUrl;
        }

        public string Genotype { get; set; }
        public string Phenotype { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
    }
}
