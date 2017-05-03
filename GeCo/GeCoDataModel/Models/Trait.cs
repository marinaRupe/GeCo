using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCoDataModel.Models
{
    public class Trait
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public int? GeneticLinkId { get; set; }

        public int? CM { get; set; }

        public Organism Organism { get; set; }

        public Inheritance Inheritance { get; set; }

        public ICollection<Allele> Alleles { get; set; }

        public ICollection<Phenotype> Phenotypes { get; set; }
    }
}
