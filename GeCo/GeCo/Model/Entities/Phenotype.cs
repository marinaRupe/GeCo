using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCo.Model.Entities
{
    public class Phenotype : IEntityBase
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
