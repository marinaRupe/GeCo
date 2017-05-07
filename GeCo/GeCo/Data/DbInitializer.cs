using GeCo.Model.Entities;
using System;
using System.Linq;

namespace GeCo.Data
{
    public static class DbInitializer
    {
        public static void Initialize(GeCoDbContext context)
        {
            //context.Database.CreateIfNotExists();
            context.Database.EnsureCreated();

            var textSource = new TextSource[]
            {
            new TextSource{Name="proba",Url="www.google.com"}
            };
            foreach (TextSource e in textSource)
            {
                context.TextSources.Add(e);
            }
            context.SaveChanges();
        }
    }
}