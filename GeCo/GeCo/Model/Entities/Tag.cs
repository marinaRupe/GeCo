using System.ComponentModel.DataAnnotations;

namespace GeCo.Model.Entities
{
    public class Tag : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        public TextSource TextSource { get; set; }

        public Organism Organism { get; set; }

        public Trait Trait { get; set; }

        public Inheritance Inheritance { get; set; }
    }
}
