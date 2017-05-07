using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCo.Model.Entities
{
    public class Inheritance : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<Trait> Traits { get; set; }
    }
}
