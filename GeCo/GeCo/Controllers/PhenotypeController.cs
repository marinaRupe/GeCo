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

    //[HttpGet("TraitName={traitName}&GenotypeName={genotypeName}")]
    //public IActionResult GetByTraitAndGenotype(string traitName, string genotypeName)
    //{
    //    if (string.IsNullOrEmpty(traitName) && string.IsNullOrEmpty(genotypeName))
    //    {
    //        return NotFound();
    //    }

    //    IEnumerable<Phenotype> _phenotype = _phenotypeRepository
    //        .FindBy(s => s.Trait.Name == traitName);

    //    if (_phenotype != null)
    //    {
    //        return new OkObjectResult(_phenotype);
    //    }
    //    else
    //    {
    //        return NotFound();
    //    }
    //}

    [HttpGet("Name={name}")]
    public IActionResult Get(string name)
    {
        IEnumerable<Phenotype> _phenotype = _phenotypeRepository
            .FindBy(s => s.Name == name);

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