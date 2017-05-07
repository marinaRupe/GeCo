using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeCoDAL
{
    public class TemporaryDbContextFactory : IDbContextFactory<GeCoDbContext>
    {
        public GeCoDbContext Create(DbContextFactoryOptions options)
        {
            var builder = new DbContextOptionsBuilder<GeCoDbContext>();
            builder.UseSqlServer("Server=tcp:geco-fer.database.windows.net,1433;Initial Catalog=GeCoDatabase;Persist Security Info=False;User ID=idespot;Password=Htjs6CJ3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            return new GeCoDbContext(builder.Options);
        }
    }
}
