using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class TraitRepository : EntityBaseRepository<Trait>, ITraitRepository
    {
        public TraitRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}