using GeCo.Data.Abstract;
using GeCo.Model;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using GeCo.Data;

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

    [HttpGet("Id={id}")]
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

    [HttpGet("Name={name}")]
    public IActionResult Get(string name)
    {
        Organism _organism = _context.Organisms.Where(o => o.Name.Equals(name)).Include(g => g.Traits).AsNoTracking().SingleOrDefault();
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

        if (OrganismView != null)
        {
            return new OkObjectResult(OrganismView);
        }
        else
        {
            return NotFound();
        }
    }

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