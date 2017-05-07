using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class PhenotypeController : Controller
{
    private IPhenotypeRepository _phenotypeRepository;
    public PhenotypeController(IPhenotypeRepository phenotypeRepository)
    {
        _phenotypeRepository = phenotypeRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Phenotype> _phenotype = _phenotypeRepository.GetAll();

        if (_phenotype != null)
        {
            return new OkObjectResult(_phenotype);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable<Phenotype> _phenotype = _phenotypeRepository
            .FindBy(s => s.Id == id);

        if (_phenotype != null)
        {
            return new OkObjectResult(_phenotype);
        }
        else
        {
            return NotFound();
        }
    }
}