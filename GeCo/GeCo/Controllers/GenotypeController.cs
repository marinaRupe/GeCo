using GeCo.Data.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class GenotypeController : Controller
    {
        private readonly IGenotypeRepository _genotypeRepository;

        public GenotypeController(IGenotypeRepository genotypeRepository)
        {
            _genotypeRepository = genotypeRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_genotypeRepository.GetAll());
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var genotype = _genotypeRepository.FindBy(s => s.Id == id);
            if (genotype == null)
            {
                return NotFound();
            }
            return new OkObjectResult(genotype);
        }
    }
}