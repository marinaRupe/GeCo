using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class PhenotypeRepository : EntityBaseRepository<Phenotype>, IPhenotypeRepository
    {
        public PhenotypeRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}