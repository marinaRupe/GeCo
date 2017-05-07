using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class OrganismController : Controller
{
    private IOrganismRepository _organismRepository;
    public OrganismController(IOrganismRepository organismRepository)
    {
        _organismRepository = organismRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Organism> _organism = _organismRepository.GetAll();

        if (_organism != null)
        {
            return new OkObjectResult(_organism);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
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
}