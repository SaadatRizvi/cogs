'use strict';


const express = require('express');
const router = express.Router();

const employmentsModel= require('../models/employmentModel');
const employmentsServices=require('../services/employmentServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    employmentsServices.validator=validator;

    router.get('/',employmentsServices.getAll());

    router.get('/:id',employmentsServices.getById());

    router.post('/', employmentsServices.set());

    router.delete('/:id', employmentsServices.deleteById());

   
    router.put('/:id', employmentsServices.update());
};

module.exports.router = router;



