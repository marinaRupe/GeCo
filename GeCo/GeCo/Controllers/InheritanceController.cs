﻿using GeCo.Data.Abstract;
using GeCo.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
public class InheritanceController : Controller
{
    private IInheritanceRepository _inheritanceRepository;
    public InheritanceController(IInheritanceRepository inheritanceRepository)
    {
        _inheritanceRepository = inheritanceRepository;
    }

    [HttpGet("GetAll")]
    public IActionResult Get()
    {

        IEnumerable<Inheritance> _inheritance = _inheritanceRepository.GetAll();

        if (_inheritance != null)
        {
            return new OkObjectResult(_inheritance);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Get/{id}")]
    public IActionResult Get(int id)
    {
        IEnumerable<Inheritance> _inheritance = _inheritanceRepository
            .FindBy(s => s.Id == id);

        if (_inheritance != null)
        {
            return new OkObjectResult(_inheritance);
        }
        else
        {
            return NotFound();
        }
    }
}