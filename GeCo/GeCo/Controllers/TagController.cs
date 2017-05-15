using GeCo.Data.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class TagController : Controller
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_tagRepository.GetAll());
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository .FindBy(s => s.Id == id);
            if (tag == null)
            {
                return NotFound();
            }
            return new OkObjectResult(tag);
        }
    }
}