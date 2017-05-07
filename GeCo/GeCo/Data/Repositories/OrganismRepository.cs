using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class OrganismRepository : EntityBaseRepository<Organism>, IOrganismRepository
    {
        public OrganismRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}