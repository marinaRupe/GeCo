using GeCo.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class OrganismView
    {
        public string Name { get; set; }

        public IEnumerable<CharacteristicsView> Characteristics { get; set; }


        public OrganismView(string name, IEnumerable<CharacteristicsView> characteristics)
        {
            Name = name;
            Characteristics = characteristics;
        }
    }
}
