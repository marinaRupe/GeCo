using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeCoDAL.Models
{
    public class TextSource
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Url]
        public string Url { get; set; }

        public ICollection<Tag> Tags { get; set; }
    }
}
