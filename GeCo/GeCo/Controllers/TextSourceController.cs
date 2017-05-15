using System.Collections.Generic;
using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class TextSourceController : Controller
    {
        private readonly ITextSourceRepository _textSourceRepository;

        public TextSourceController(ITextSourceRepository textSourceRepository)
        {
            _textSourceRepository = textSourceRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_textSourceRepository.GetAll());
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var textSource = _textSourceRepository.FindBy(s => s.Id == id);
            if (textSource == null)
            {
                return NotFound();
            }
            return new OkObjectResult(textSource);
        }

        [HttpGet("Name={name}")]
        public IActionResult Get(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return NotFound();
            }
            var textSource = _textSourceRepository.FindBy(s => s.Name == name);
            if (textSource == null)
            {
                return NotFound();
            }
            return new OkObjectResult(textSource);
        }
        //[HttpDelete("Remove/{Id}")]
        //public IActionResult Delete(int id)
        //{
        //    TextSource _textSource = _textSourceRepository.GetSingle(id);

        //    if (_textSource == null)
        //    {
        //        return new NotFoundResult();
        //    }
        //    else
        //    {
        //        _textSourceRepository.Delete(_textSource);

        //        _textSourceRepository.Commit();

        //        return new NoContentResult();
        //    }
        //}
    }
}