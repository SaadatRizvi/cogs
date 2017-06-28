'use strict';


const express = require('express');
const router = express.Router();

const employeesModel= require('../models/employeeModel');
const employeesServices=require('../services/employeeServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    employeesServices.validator=validator;

    router.get('/',employeesServices.getAll());

    router.get('/:id',employeesServices.getById());

    router.get('/:name',employeesServices.getByName());

    router.post('/', employeesServices.set());

    router.delete('/:id', employeesServices.deleteById());

    router.delete('/:name', employeesServices.deleteByName());

    router.put('/:id', employeesServices.update());
};

module.exports.router = router;



