using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class AllTraitPairsView
    {
        public AllTraitPairsView(List<TraitPairsView> traitPairsView, string organism)
        {
            TraitPairsView = traitPairsView;
            Organism = organism;
        }

        public List<TraitPairsView> TraitPairsView { get; set; }

        public string Organism { get; set; }
    }
}
