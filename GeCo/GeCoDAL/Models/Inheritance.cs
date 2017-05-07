using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCoDAL.Models
{
    public class Inheritance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<Trait> Traits { get; set; }
    }
}
