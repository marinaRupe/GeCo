using GeCo.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class DoubleTrait : IEquatable<DoubleTrait>
    {
        public DoubleTrait(Trait traitOne, Trait traitTwo)
        {
            TraitOne = traitOne;
            TraitTwo = traitTwo;
        }

        public bool Equals(DoubleTrait other)
        {
            return TraitOne.Id == other.TraitOne.Id && TraitTwo.Id == other.TraitTwo.Id;
        }

        public Trait TraitOne { get; set; }

        public Trait TraitTwo { get; set; }

    }
}
