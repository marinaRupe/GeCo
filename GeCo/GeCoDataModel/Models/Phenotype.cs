using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCoDataModel.Models
{
    public class Phenotype
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Url]
        public string ImageURL { get; set; }
        
        public Trait Trait { get; set; }

        public ICollection<Genotype> Genotypes { get; set; }
    }
}
