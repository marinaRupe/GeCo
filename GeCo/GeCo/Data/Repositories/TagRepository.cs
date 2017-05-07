using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class TagRepository : EntityBaseRepository<Tag>, ITagRepository
    {
        public TagRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}