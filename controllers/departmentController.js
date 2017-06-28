'use strict';


const express = require('express');
const router = express.Router();

const departmentsModel= require('../models/departmentModel');
const departmentsServices=require('../services/departmentServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    departmentsServices.validator=validator;

    router.get('/',departmentsServices.getAll());

    router.get('/:id',departmentsServices.getById());

    router.post('/', departmentsServices.set());

    router.delete('/:id', departmentsServices.deleteById());

    router.put('/:id', departmentsServices.update());
};

module.exports.router = router;



