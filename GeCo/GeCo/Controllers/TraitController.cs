using GeCo.Data;
using GeCo.Data.Abstract;
using GeCo.Model;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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

    [HttpGet("Organism={id}")]
    public IActionResult GetTraitPairs(int id)
    {
        IEnumerable<Trait> _trait = _context.Traits.Include(t => t.Organism).Where(t => t.Organism.Id == id).ToList();

        List<DoubleTrait> visited = new List<DoubleTrait>();
        List<TraitPairsView> TraitPairsView = new List<TraitPairsView>();

        foreach (Trait trait1 in _trait)
        {
            foreach (Trait trait2 in _trait)
            {
                if (!visited.Contains(new DoubleTrait(trait1, trait2)) && !visited.Contains(new DoubleTrait(trait2, trait1)) && trait1.GeneticLinkId != null && trait2.GeneticLinkId != null && trait1.GeneticLinkId == trait2.GeneticLinkId && trait1 != trait2)
                {
                    TraitPairsView.Add(new TraitPairsView(trait1.Name, trait2.Name, Math.Abs((int)trait1.CM - (int)trait2.CM)));
                    visited.Add(new DoubleTrait(trait1, trait2));
                }
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

    [HttpGet("GetAllPairs")]
    public IActionResult GetTraitPairs()
    {
        List<AllTraitPairsView> AllTraitPairsView = new List<AllTraitPairsView>();
        IEnumerable<Organism> _organism = _context.Organisms.Where(i => i.Id != 0).ToList();
        foreach (Organism organism in _organism)
        {
            IEnumerable<Trait> _trait = _context.Traits.Include(t => t.Organism).Where(t => t.Organism.Name.Equals(organism.Name)).ToList();
            List<TraitPairsView> TraitPairsView = new List<TraitPairsView>();
            List<DoubleTrait> visited = new List<DoubleTrait>();

            foreach (Trait trait1 in _trait)
            {
                foreach (Trait trait2 in _trait)
                {
                    if (!visited.Contains(new DoubleTrait(trait1, trait2)) && !visited.Contains(new DoubleTrait(trait2, trait1)) && trait1.GeneticLinkId != null && trait2.GeneticLinkId != null && trait1.GeneticLinkId == trait2.GeneticLinkId && trait1 != trait2)
                    {
                        TraitPairsView.Add(new TraitPairsView(trait1.Name, trait2.Name, Math.Abs((int)trait1.CM - (int)trait2.CM)));
                        visited.Add(new DoubleTrait(trait1, trait2));
                    }
                }
            }
            AllTraitPairsView.Add(new AllTraitPairsView(TraitPairsView, organism.Name));
        }
        if (AllTraitPairsView != null)
        {
            return new OkObjectResult(AllTraitPairsView);
        }
        else
        {
            return NotFound();
        }
    }
}