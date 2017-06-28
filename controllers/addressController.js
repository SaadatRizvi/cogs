'use strict';


const express = require('express');
const router = express.Router();

const addressServices=require('../services/addressServices');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;
    addressServices.validator=validator;

    router.get('/',addressServices.getAll());

    router.get('/:id',addressServices.getById());

    router.post('/', addressServices.set());

    router.delete('/:id', addressServices.deleteById());

    router.put('/:id', addressServices.update());
};

module.exports.router = router;



