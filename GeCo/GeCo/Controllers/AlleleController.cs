using System.Linq;
using GeCo.Data;
using GeCo.Data.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class AlleleController : Controller
    {
        private readonly IAlleleRepository _alleleRepository;
        private readonly GeCoDbContext _context;

        public AlleleController(GeCoDbContext context, IAlleleRepository alleleRepository)
        {
            _alleleRepository = alleleRepository;
            _context = context;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_alleleRepository.GetAll());
            /*
            IEnumerable<Allele> _allele = _alleleRepository.GetAll();

            List<string> alleles = new List<string>();
            foreach (Allele allele in _allele)
            {
                alleles.Add(allele.Symbol);
            }

            if (_allele != null)
            {
                return new OkObjectResult(_allele);
            }
            else
            {
                return NotFound();
            }
            */
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var allele = _alleleRepository.FindBy(s => s.Id == id);
            if (allele == null)
            {
                return NotFound();
            }
            return new OkObjectResult(allele);
        }

        [HttpGet("Symbol={symbol}")]
        public IActionResult Get(string symbol)
        {
            if (string.IsNullOrEmpty(symbol))
            {
                return NotFound();
            }
            return new OkObjectResult(_alleleRepository.FindBy(s => s.Symbol == symbol));
            /*
            IEnumerable<Allele> _alleles = _alleleRepository
                .FindBy(s => s.Symbol == symbol);


            List<string> alleles = new List<string>();
            foreach (Allele allele in _alleles)
            {
                alleles.Add(allele.Symbol);
            }

            if (_alleles != null)
            {
                return new OkObjectResult(_alleles);
            }
            else
            {
                return NotFound();
            }
            */
        }

        [HttpGet("Trait={trait}")]
        public IActionResult GetAllelesByTrait(string trait)
        {
            if (string.IsNullOrEmpty(trait))
            {
                return NotFound();
            }
            return
                new OkObjectResult(
                    _context.Alleles.Include(a => a.Trait).Where(a => a.Trait.Name.Equals(trait)).AsNoTracking());
            /*
            IEnumerable<Allele> _alleles = _context.Alleles.Include(a => a.Trait).Where(a => a.Trait.Name.Equals(trait));


            List<string> alleles = new List<string>();
            foreach (Allele allele in _alleles)
            {
                alleles.Add(allele.Symbol);
            }

            if (_alleles != null)
            {
                return new OkObjectResult(_alleles);
            }
            else
            {
                return NotFound();
            }
            */
        }


    }
}