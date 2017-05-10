using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class TraitsView
    {
        public TraitsView(IEnumerable<TraitView> traitView)
        {
            TraitView = traitView;
        }

        public IEnumerable<TraitView> TraitView { get; set; }
    }
}
