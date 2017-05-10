using GeCo.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class CharacteristicsView
    {
        public string Characteristic { get; set; }
        public List<TraitView> Traits { get; set; }
        public string InheritanceType { get; set; }

        public CharacteristicsView(string characteristic, List<TraitView> trait, string inheritanceType)
        {
            Characteristic = characteristic;
            Traits = trait;
            InheritanceType = inheritanceType;
        }
    }
}
