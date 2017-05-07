using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class GenotypeRepository : EntityBaseRepository<Genotype>, IGenotypeRepository
    {
        public GenotypeRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}