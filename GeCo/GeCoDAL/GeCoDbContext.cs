using GeCoDAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GeCoDAL
{
    public class GeCoDbContext : DbContext
    {
        public DbSet<Allele> Alleles { get; set; }
        public DbSet<Genotype> Genotypes { get; set; }
        public DbSet<Inheritance> Inheritances { get; set; }
        public DbSet<Organism> Organisms { get; set; }
        public DbSet<Phenotype> Phenotypes { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TextSource> TextSources { get; set; }
        public DbSet<Trait> Traits { get; set; }

        public GeCoDbContext() : base()
        {
        }

        public GeCoDbContext(DbContextOptions<GeCoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Trait
            modelBuilder.Entity<Trait>().HasOne(t => t.Organism)
                                        .WithMany(o => o.Traits)
                                        .IsRequired()
                                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Trait>().HasOne(t => t.Inheritance)
                                        .WithMany(i => i.Traits)
                                        .IsRequired()
                                        .OnDelete(DeleteBehavior.Restrict);

            // Allele
            modelBuilder.Entity<Allele>().HasOne(a => a.Trait)
                                         .WithMany(t => t.Alleles)
                                         .IsRequired()
                                         .OnDelete(DeleteBehavior.Cascade);

            // Genotype
            modelBuilder.Entity<Genotype>().HasOne(g => g.FirstAllele)
                                           .WithMany()
                                           .HasForeignKey(g => g.FirstAlleleId)
                                           .IsRequired()
                                           .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Genotype>().HasOne(g => g.SecondAllele)
                                           .WithMany()
                                           .HasForeignKey(g => g.SecondAlleleId)
                                           .IsRequired()
                                           .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Genotype>().HasOne(g => g.Phenotype)
                                           .WithMany(p => p.Genotypes)
                                           .IsRequired()
                                           .OnDelete(DeleteBehavior.Restrict);

            // Phenotype
            modelBuilder.Entity<Phenotype>().HasOne(p => p.Trait)
                                            .WithMany(t => t.Phenotypes)
                                            .IsRequired()
                                            .OnDelete(DeleteBehavior.Cascade);

            // Tag
            modelBuilder.Entity<Tag>().HasOne(t => t.TextSource)
                                      .WithMany(txt => txt.Tags)
                                      .IsRequired()
                                      .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Tag>().HasOne(t => t.Organism)
                                      .WithMany();
            modelBuilder.Entity<Tag>().HasOne(t => t.Inheritance)
                                      .WithMany();
            modelBuilder.Entity<Tag>().HasOne(t => t.Trait)
                                      .WithMany();
        }
    }
}
