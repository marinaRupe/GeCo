using GeCo.Model.Entities;

namespace GeCo.Data.Abstract
{
    public interface IAlleleRepository : IEntityBaseRepository<Allele> { }
    public interface IGenotypeRepository : IEntityBaseRepository<Genotype> { }
    public interface IInheritanceRepository : IEntityBaseRepository<Inheritance> { }
    public interface IOrganismRepository : IEntityBaseRepository<Organism> { }
    public interface IPhenotypeRepository : IEntityBaseRepository<Phenotype> { }
    public interface ITagRepository : IEntityBaseRepository<Tag> { }
    public interface ITextSourceRepository : IEntityBaseRepository<TextSource> { }
    public interface ITraitRepository : IEntityBaseRepository<Trait> { }
}