'use strict';


const express = require('express');
const router = express.Router();

const educationServices=require('../services/educationServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    educationServices.validator=validator;

    router.get('/',educationServices.getAll());

    router.get('/:id',educationServices.getById());

    router.post('/', educationServices.set());

    router.delete('/:id', educationServices.deleteById());

    router.put('/:id', educationServices.update());
};

module.exports.router = router;



