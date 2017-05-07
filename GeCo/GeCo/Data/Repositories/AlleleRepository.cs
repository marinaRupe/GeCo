using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class AlleleRepository : EntityBaseRepository<Allele>, IAlleleRepository
    {
        public AlleleRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}