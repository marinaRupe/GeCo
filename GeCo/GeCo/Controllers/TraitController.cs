using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class TraitController : Controller
{
    private ITraitRepository _traitRepository;
    public TraitController(ITraitRepository traitRepository)
    {
        _traitRepository = traitRepository;
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
}