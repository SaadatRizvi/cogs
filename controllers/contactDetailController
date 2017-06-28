'use strict';


const express = require('express');
const router = express.Router();

const contactDetailModel= require('../models/contactDetailModel');
const contactDetailServices=require('../services/contactDetailServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    contactDetailServices.validator=validator;

    router.get('/',contactDetailServices.getAll());

    router.get('/:id',contactDetailServices.getById());

    router.post('/', contactDetailServices.set());

    router.delete('/:id', contactDetailServices.deleteById());

    router.put('/:id', contactDetailServices.update());
};

module.exports.router = router;



