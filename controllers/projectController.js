'use strict';


const express = require('express');
const router = express.Router();

const projectsModel= require('../models/projectModel');
const projectsServices=require('../services/projectServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    projectsServices.validator=validator;

    router.get('/',projectsServices.getAll());

    router.get('/:id',projectsServices.getById());

    router.get('/:name',projectsServices.getByName());

    router.post('/', projectsServices.set());

    router.delete('/:id', projectsServices.deleteById());

    router.delete('/:name', projectsServices.deleteByName());

    router.put('/:id', projectsServices.update());
};

module.exports.router = router;



