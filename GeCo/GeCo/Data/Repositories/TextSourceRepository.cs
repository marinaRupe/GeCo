using GeCo.Data.Abstract;
using GeCo.Model.Entities;

namespace GeCo.Data.Repositories
{
    public class TextSourceRepository : EntityBaseRepository<TextSource>, ITextSourceRepository
    {
        public TextSourceRepository(GeCoDbContext context)
            : base(context)
        { }
    }
}