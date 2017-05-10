using GeCo.Data;
using GeCo.Data.Abstract;
using GeCo.Model;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

[Route("api/[controller]")]
public class TraitController : Controller
{
    private ITraitRepository _traitRepository;
    private GeCoDbContext _context;
    public TraitController(GeCoDbContext context, ITraitRepository traitRepository)
    {
        _traitRepository = traitRepository;
        _context = context;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Trait> _trait = _traitRepository.GetAll();

        if (_trait != null)
        {
            return new OkObjectResult(_trait);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable<Trait> _trait = _traitRepository
            .FindBy(s => s.Id == id);

        if (_trait != null)
        {
            return new OkObjectResult(_trait);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Name={name}")]
    public IActionResult Get(string name)
    {
        IEnumerable<Trait> _trait = _traitRepository
            .FindBy(s => s.Name == name);

        if (_trait != null)
        {
            return new OkObjectResult(_trait);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Organism={organism}")]
    public IActionResult GetTraitPairs(string organism)
    {
        IEnumerable<Trait> _trait = _context.Traits.Include(t => t.Organism).Where(t => t.Organism.Name.Equals(organism)).ToList();
        List<Trait> visited = new List<Trait>();
        List<TraitPairsView> TraitPairsView = new List<TraitPairsView>();
        foreach (Trait trait in _trait)
        {
            if (trait.GeneticLinkId != null && !visited.Contains(trait))
            {
                Trait secondTrait = _traitRepository.GetSingle((int)trait.GeneticLinkId);

                TraitPairsView.Add(new TraitPairsView(trait.Name, secondTrait.Name, (int)trait.CM));

                visited.Add(secondTrait);
                visited.Add(trait);

            }

        }

        if (TraitPairsView != null)
        {
            return new OkObjectResult(TraitPairsView);
        }
        else
        {
            return NotFound();
        }
    }
}