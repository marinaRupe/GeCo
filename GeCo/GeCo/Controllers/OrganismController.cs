using GeCo.Data.Abstract;
using GeCo.Model;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using GeCo.Data;
using System.Threading.Tasks;

[Route("api/[controller]")]
public class OrganismController : Controller
{
    private IOrganismRepository _organismRepository;
    private ITraitRepository _traitRepository;
    private IAlleleRepository _alleleRepository;
    private IGenotypeRepository _genotypeRepository;
    private IPhenotypeRepository _phenotypeRepository;
    private IInheritanceRepository _inheritanceRepository;
    private GeCoDbContext _context;

    public OrganismController(GeCoDbContext context, IOrganismRepository organismRepository, IInheritanceRepository inheritanceRepository, ITraitRepository traitRepository, IAlleleRepository alleleRepository, IGenotypeRepository genotypeRepository, IPhenotypeRepository phenotypeRepository)
    {
        _organismRepository = organismRepository;
        _traitRepository = traitRepository;
        _alleleRepository = alleleRepository;
        _genotypeRepository = genotypeRepository;
        _phenotypeRepository = phenotypeRepository;
        _inheritanceRepository = inheritanceRepository;
        _context = context;
    }

    [HttpGet("Get/{id}")]
    public IActionResult GeById(int id)
    {
        IEnumerable<Organism> _organism = _organismRepository
            .FindBy(s => s.Id == id);

        if (_organism != null)
        {
            return new OkObjectResult(_organism);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

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
    }

    [HttpGet("GetData/{Id}")]
    public IActionResult Get(int id)
    {
        var organism = _context.Organisms.FirstOrDefault(o => o.Id == id);
        var traits =
            _context.Traits.Include(t => t.Organism)
                .Where(t => t.Organism.Id == id)
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

        var organismView = new OrganismView(organism.Name, characteristicsViews);
        return new OkObjectResult(organismView);
    }

    /*
    [HttpGet("GetAllData")]
    public IActionResult GetAll()
    {
        var organisms = _context.Organisms.AsNoTracking();
        var traits =
            _context.Traits.Include(t => t.Organism)
                .Include(t => t.Inheritance)
                .Include(t => t.Alleles)
                .Include(t => t.Phenotypes)
                .ThenInclude(p => p.Genotypes)
                .AsNoTracking();

        var traitViews = new List<TraitView>();
        var characteristicsViews = new List<CharacteristicsView>();
        var organismViews = new List<OrganismView>();

        foreach (var organism in organisms)
        {
            foreach (var trait in traits)
            {
                if (trait.Organism.Id != organism.Id)
                {
                    continue;
                }
                foreach (var phenotype in trait.Phenotypes)
                {
                    foreach (var genotype in phenotype.Genotypes)
                    {
                        var firstAllele = trait.Alleles.FirstOrDefault(a => a.Id == genotype.FirstAlleleId);
                        var secondAllele = trait.Alleles.FirstOrDefault(a => a.Id == genotype.SecondAlleleId);
                        traitViews.Add(new TraitView(new GenotypeView(firstAllele.Symbol, secondAllele.Symbol),
                            phenotype.Name, firstAllele.Symbol.Equals(secondAllele.Symbol) ? "homozigot" : "heterozigot",
                            phenotype.ImageURL));
                    }
                }
                characteristicsViews.Add(new CharacteristicsView(trait.Name, new List<TraitView>(traitViews),
                    trait.Inheritance.Name));
                traitViews.Clear();
            }

            organismViews.Add(new OrganismView(organism.Name, new List<CharacteristicsView>(characteristicsViews)));
            characteristicsViews.Clear();
        }
        return new OkObjectResult(organismViews);
    }
    */
    
    
    [HttpGet("GetAllData")]
    public IActionResult GetAll()
    {
        IEnumerable<Organism> _organisms = _context.Organisms.Include(g => g.Traits).AsNoTracking().ToList();
        AllDataView AllDataView = new AllDataView();
        foreach (Organism _organism in _organisms)
        {
            IEnumerable<Trait> _trait = _context.Traits.Include(t => t.Organism).Where(t => t.Organism.Id == _organism.Id).Include(t => t.Inheritance).AsNoTracking().ToList();

            IEnumerable<Phenotype> _phenotypes;
            IEnumerable<Genotype> _genotypes;

            List<TraitView> TraitView = new List<TraitView>();
            List<CharacteristicsView> CharacteristicsView = new List<CharacteristicsView>();

            foreach (Trait trait in _trait)
            {
                _genotypes = _context.Genotypes.Include(g => g.Phenotype).Where(g => g.Phenotype.Trait.Id == trait.Id).AsNoTracking().ToList();
                foreach (Genotype genotype in _genotypes)
                {
                    _phenotypes = _context.Phenotypes.Include(g => g.Trait).Where(tr => trait.Id == tr.Trait.Id && tr.Id == genotype.Phenotype.Id).AsNoTracking().ToList();
                    foreach (Phenotype phenotype in _phenotypes)
                    {
                        if (genotype.Phenotype.Id == phenotype.Id && phenotype.Trait.Id == trait.Id)
                        {
                            Allele FirstAllele = _alleleRepository.GetSingle(genotype.FirstAlleleId);
                            Allele SecondAllele = _alleleRepository.GetSingle(genotype.SecondAlleleId);
                            TraitView.Add(new TraitView(new GenotypeView(FirstAllele.Symbol, SecondAllele.Symbol), phenotype.Name, FirstAllele.Symbol.Equals(SecondAllele.Symbol) ? "homozigot" : "heterozigot", phenotype.ImageURL));
                        }
                    }
                }
                CharacteristicsView.Add(new CharacteristicsView(trait.Name, new List<TraitView>(TraitView), trait.Inheritance.Name));
                TraitView.Clear();
            }
            OrganismView OrganismView = new OrganismView(_organism.Name, CharacteristicsView);
            AllDataView.Add(OrganismView);
        }
        if (AllDataView != null)
        {
            return new OkObjectResult(AllDataView);
        }
        else
        {
            return NotFound();
        }
    }
}