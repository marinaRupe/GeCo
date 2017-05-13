using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCo.Model
{
    public class AllDataView
    {
        public AllDataView()
        {
            AllData = new List<OrganismView>();
        }

        public List<OrganismView> AllData { get; set; }

        public void Add(OrganismView OrganismView)
        {
            AllData.Add(OrganismView);
        }
    }
}
