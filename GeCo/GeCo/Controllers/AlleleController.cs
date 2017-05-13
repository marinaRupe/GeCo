using GeCo.Data;
using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

[Route("api/[controller]")]
public class AlleleController : Controller
{
    private IAlleleRepository _alleleRepository;
    private GeCoDbContext _context;
    public AlleleController(GeCoDbContext context, IAlleleRepository alleleRepository)
    {
        _alleleRepository = alleleRepository;
        _context = context;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

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
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable<Allele> _allele = _alleleRepository
            .FindBy(s => s.Id == id);

        if (_allele != null)
        {
            return new OkObjectResult(_allele);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Symbol={symbol}")]
    public IActionResult Get(string symbol)
    {
        if (string.IsNullOrEmpty(symbol))
        {
            return NotFound();
        }

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
    }

    [HttpGet("Trait={trait}")]
    public IActionResult GetAllelesByTrait(string trait)
    {
        if (string.IsNullOrEmpty(trait))
        {
            return NotFound();
        }

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
    }


}