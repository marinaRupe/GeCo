using System;
using System.Collections.Generic;
using System.Linq;
using GeCo.Data;
using GeCo.Data.Abstract;
using GeCo.Model;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class TraitController : Controller
    {
        private readonly ITraitRepository _traitRepository;
        private readonly GeCoDbContext _context;

        private const int RESPONSE_CACHE_DURATION = 120;    // seconds

        public TraitController(GeCoDbContext context, ITraitRepository traitRepository)
        {
            _traitRepository = traitRepository;
            _context = context;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_traitRepository.GetAll());
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var trait = _traitRepository.FindBy(s => s.Id == id);
            if (trait == null)
            {
                return NotFound();
            }
            return new OkObjectResult(trait);
        }

        [ResponseCache(Duration = RESPONSE_CACHE_DURATION)]
        [HttpGet("Organism={id}")]
        public IActionResult GetTraitPairs(int id)
        {
            var traits =
                _context.Traits.Include(t => t.Organism)
                    .Where(t => t.Organism.Id == id && t.GeneticLinkId != null)
                    .AsNoTracking()
                    .ToList();

            var visited = new List<DoubleTrait>();
            var traitPairsView = new List<TraitPairsView>();

            // possible group by and select
            foreach (var trait1 in traits)
            {
                var linkedTraits = traits.Where(t => t.GeneticLinkId == trait1.GeneticLinkId).ToList();
                linkedTraits.Remove(trait1);
                foreach (var trait2 in linkedTraits)
                {
                    if (!visited.Contains(new DoubleTrait(trait1, trait2)))
                    {
                        traitPairsView.Add(new TraitPairsView(trait1.Name, trait2.Name, Math.Abs((trait1.CM ?? 0) - (trait2.CM ?? 0))));
                        visited.Add(new DoubleTrait(trait1, trait2));
                    }
                }
            }
            return new OkObjectResult(traitPairsView);
            /*
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
            */
        }

        [ResponseCache(Duration = RESPONSE_CACHE_DURATION)]
        [HttpGet("GetAllPairs")]
        public IActionResult GetTraitPairs()
        {
            var traits =
                _context.Traits.Include(t => t.Organism).Where(t => t.GeneticLinkId != null).AsNoTracking().ToList();

            var allTraitPairsViewsDictionary = new Dictionary<string, List<TraitPairsView>>();
            var allTraitPairsViews = new List<AllTraitPairsView>();
            var visited = new List<DoubleTrait>();

            foreach (var trait1 in traits)
            {
                var traitPairsView = new List<TraitPairsView>();

                var linkedTraits =
                    traits.Where(t => t.GeneticLinkId == trait1.GeneticLinkId && t.Organism.Id == trait1.Organism.Id)
                        .ToList();
                linkedTraits.Remove(trait1);

                foreach (var trait2 in linkedTraits)
                {
                    if (!visited.Contains(new DoubleTrait(trait1, trait2)))
                    {
                        traitPairsView.Add(new TraitPairsView(trait1.Name, trait2.Name, Math.Abs((trait1.CM ?? 0) - (trait2.CM ?? 0))));
                        visited.Add(new DoubleTrait(trait1, trait2));
                    }
                }

                if (traitPairsView.Count > 0)
                {
                    var organismName = trait1.Organism.Name;
                    if (allTraitPairsViewsDictionary.ContainsKey(organismName))
                    {
                        allTraitPairsViewsDictionary[organismName].AddRange(traitPairsView);
                    }
                    else
                    {
                        allTraitPairsViewsDictionary[organismName] = traitPairsView;
                    }
                }
            }

            foreach (var keyValuePair in allTraitPairsViewsDictionary)
            {
                allTraitPairsViews.Add(new AllTraitPairsView(keyValuePair.Value, keyValuePair.Key));
            }
            return new OkObjectResult(allTraitPairsViews);
            
            /*
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
            */
            
        }
    }
}