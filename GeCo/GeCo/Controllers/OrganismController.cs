using System;
using System.Collections.Generic;
using System.Linq;
using GeCo.Data;
using GeCo.Data.Abstract;
using GeCo.Model;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class OrganismController : Controller
    {
        private readonly IOrganismRepository _organismRepository;
        private readonly GeCoDbContext _context;

        private readonly IMemoryCache _cache;
        private readonly MemoryCacheEntryOptions _defaultOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)  // put 1-3 min for testing
        };

        private const int RESPONSE_CACHE_DURATION = 120;    // seconds

        public OrganismController(GeCoDbContext context, IOrganismRepository organismRepository, IMemoryCache memoryCache)
        {
            _organismRepository = organismRepository;
            _context = context;
            
            _cache = memoryCache;
        }

        [HttpGet("Get/{id}")]
        public IActionResult GetById(int id)
        {
            var organism = _organismRepository.FindBy(s => s.Id == id);
            if (organism == null)
            {
                return NotFound();
            }
            return new OkObjectResult(organism);
        }

        [ResponseCache(Duration = RESPONSE_CACHE_DURATION)]
        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_organismRepository.GetAll());

            /*  BUT WHY?
            IEnumerable<Organism> _organism = _organismRepository.GetAll();

            List<string> organisms = new List<string>();
            foreach (Organism organism in _organism)
            {
                organisms.Add(organism.Name);
            }

            if (_organism != null)
            {
                return new OkObjectResult(_organism);
            }
            else
            {
                return NotFound();
            }
            */
        }

        [ResponseCache(Duration = RESPONSE_CACHE_DURATION)]
        [HttpGet("GetData/{Id}")]
        public IActionResult Get(int id)
        {
            OkObjectResult result;
            if (!_cache.TryGetValue(id, out result))
            {
                var organism = _context.Organisms.FirstOrDefault(o => o.Id == id);
                result = new OkObjectResult(GenerateOrganismView(organism));
                _cache.Set(id, result, _defaultOptions);
            }
            return result;
        }

        private OrganismView GenerateOrganismView(Organism organism)
        {
            var traits =
                _context.Traits.Include(t => t.Organism)
                    .Where(t => t.Organism.Id == organism.Id)
                    .Include(t => t.Inheritance)
                    .Include(t => t.Alleles)
                    .Include(t => t.Phenotypes)
                    .ThenInclude(p => p.Genotypes)
                    .AsNoTracking();

            var traitViews = new List<TraitView>();
            var characteristicsViews = new List<CharacteristicsView>();

            foreach (var trait in traits)
            {
                foreach (var phenotype in trait.Phenotypes)
                {
                    foreach (var genotype in phenotype.Genotypes)
                    {
                        var firstAllele = trait.Alleles.FirstOrDefault(a => a.Id == genotype.FirstAlleleId);
                        var secondAllele = trait.Alleles.FirstOrDefault(a => a.Id == genotype.SecondAlleleId);
                        traitViews.Add(new TraitView(new GenotypeView(firstAllele.Symbol, secondAllele.Symbol), phenotype.Name, firstAllele.Symbol.Equals(secondAllele.Symbol) ? "homozigot" : "heterozigot", phenotype.ImageURL));
                    }
                }
                characteristicsViews.Add(new CharacteristicsView(trait.Name, new List<TraitView>(traitViews), trait.Inheritance.Name));
                traitViews.Clear();
            }

            return new OrganismView(organism.Name, characteristicsViews);
        }
    
        [ResponseCache(Duration = RESPONSE_CACHE_DURATION)]
        [HttpGet("GetAllData")]
        public IActionResult GetAll()
        {
            var organisms = _organismRepository.GetAll().ToList();
            var allDataView = new AllDataView();
            organisms.ForEach(o => allDataView.Add(GenerateOrganismView(o)));
            return new OkObjectResult(allDataView);
        }
    }
}