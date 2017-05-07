using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class TagController : Controller
{
    private ITagRepository _tagRepository;
    public TagController(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Tag> _tag = _tagRepository.GetAll();

        if (_tag != null)
        {
            return new OkObjectResult(_tag);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable<Tag> _tag = _tagRepository
            .FindBy(s => s.Id == id);

        if (_tag != null)
        {
            return new OkObjectResult(_tag);
        }
        else
        {
            return NotFound();
        }
    }
}