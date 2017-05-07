using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCo.Model.Entities
{
    public class Organism : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string LatinName { get; set; }

        [Url]
        public string ImageURL { get; set; }

        public string Description { get; set; }

        public ICollection<Trait> Traits { get; set; }
    }
}
