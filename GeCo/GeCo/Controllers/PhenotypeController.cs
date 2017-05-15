using System.Linq;
using GeCo.Data.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GeCo.Controllers
{
    [Route("api/[controller]")]
    public class PhenotypeController : Controller
    {
        private readonly IPhenotypeRepository _phenotypeRepository;

        public PhenotypeController(IPhenotypeRepository phenotypeRepository)
        {
            _phenotypeRepository = phenotypeRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return new OkObjectResult(_phenotypeRepository.GetAll());
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var phenotype = _phenotypeRepository.FindBy(s => s.Id == id);
            if (phenotype == null)
            {
                return NotFound();
            }
            return new OkObjectResult(phenotype);
        }

        [HttpGet("Name={name}")]
        public IActionResult Get(string name)
        {
            var phenotype = _phenotypeRepository.FindBy(s => s.Name == name).FirstOrDefault();
            if (phenotype == null)
            {
                return NotFound();
            }
            return new OkObjectResult(phenotype);
        }
    }
}