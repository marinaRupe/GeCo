using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class AlleleController : Controller
{
    private IAlleleRepository _alleleRepository;
    public AlleleController(IAlleleRepository alleleRepository)
    {
        _alleleRepository = alleleRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Allele> _allele = _alleleRepository.GetAll();

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
}