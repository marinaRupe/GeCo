using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class TextSourceController : Controller
{
    private ITextSourceRepository _textSourceRepository;
    public TextSourceController(ITextSourceRepository textSourceRepository)
    {
        _textSourceRepository = textSourceRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<TextSource> _textSource = _textSourceRepository.GetAll();

        if (_textSource != null)
        {
            return new OkObjectResult(_textSource);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable <TextSource> _textSource = _textSourceRepository
            .FindBy(s => s.Id == id);

        if (_textSource != null)
        {
            //ScheduleViewModel _scheduleVM = Mapper.Map<Schedule, ScheduleViewModel>(_schedule);
            return new OkObjectResult(_textSource);
        }
        else
        {
            return NotFound();
        }
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