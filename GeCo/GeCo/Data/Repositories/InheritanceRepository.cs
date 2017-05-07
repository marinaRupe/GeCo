using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class InheritenceRepository : EntityBaseRepository<Inheritance>, IInheritanceRepository
    {
        public InheritenceRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}