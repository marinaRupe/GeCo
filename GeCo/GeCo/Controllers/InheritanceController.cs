using GeCo.Data.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class InheritanceController : Controller
    {
        private readonly IInheritanceRepository _inheritanceRepository;

        public InheritanceController(IInheritanceRepository inheritanceRepository)
        {
            _inheritanceRepository = inheritanceRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_inheritanceRepository.GetAll());
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var inheritance = _inheritanceRepository.FindBy(s => s.Id == id);
            if (inheritance == null)
            {
                return NotFound();
            }
            return new OkObjectResult(inheritance);
        }
    }
}