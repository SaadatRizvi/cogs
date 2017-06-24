'use strict';


const express = require('express');
const router = express.Router();

const departmentsModel= require('../models/departmentsModel');
const departmentsServices=require('../services/departmentsServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    departmentsServices.validator=validator;

    router.get('/',departmentsServices.getAll());

    router.get('/:id',departmentsServices.getById());

    router.get('/:name',departmentsServices.getByName());

    router.post('/', departmentsServices.set());

    router.delete('/:id', departmentsServices.deleteById());

    router.delete('/:name', departmentsServices.deleteByName());

    router.put('/:id', departmentsServices.update());
};

module.exports.router = router;



