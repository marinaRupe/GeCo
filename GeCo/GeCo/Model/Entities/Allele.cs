using System.ComponentModel.DataAnnotations;

namespace GeCo.Model.Entities
{
    public class Allele : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(5)]
        public string Symbol { get; set; }

        public bool Dominant { get; set; }

        public char? Allosome { get; set; }

        public Trait Trait { get; set; }
    }
}
