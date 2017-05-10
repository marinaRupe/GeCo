using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeCo.Model.Entities
{
    public class Genotype : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        public int FirstAlleleId { get; set; }
        public Allele FirstAllele { get; set; }

        public int SecondAlleleId { get; set; }
        public Allele SecondAllele { get; set; }

        public virtual Phenotype Phenotype { get; set; }
    }
}
