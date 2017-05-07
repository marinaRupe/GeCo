using System.ComponentModel.DataAnnotations;

namespace GeCoDAL.Models
{
    public class Allele
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
