using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class GenotypeView
    {
        public GenotypeView(string allele1, string allele2)
        {
            Allele1 = allele1;
            Allele2 = allele2;
        }

        public string Allele1 { get; set; }

        public string Allele2 { get; set; }
    }

}