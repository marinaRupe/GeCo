using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class GenotypeController : Controller
{
    private IGenotypeRepository _genotypeRepository;
    public GenotypeController(IGenotypeRepository genotypeRepository)
    {
        _genotypeRepository = genotypeRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Genotype> _genotype = _genotypeRepository.GetAll();

        if (_genotype != null)
        {
            return new OkObjectResult(_genotype);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable<Genotype> _genotype = _genotypeRepository
            .FindBy(s => s.Id == id);

        if (_genotype != null)
        {
            return new OkObjectResult(_genotype);
        }
        else
        {
            return NotFound();
        }
    }
}