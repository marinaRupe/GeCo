using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class TraitView
    {
        public TraitView(GenotypeView genotype, string phenotype, string type, string imageUrl)
        {
            Genotype = genotype;
            Phenotype = phenotype;
            Type = type;
            ImageUrl = imageUrl;
        }

        public GenotypeView Genotype { get; set; }
        public string Phenotype { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
    }
}
