'use strict';


const express = require('express');
const router = express.Router();


const departmentsModel= require('../models/departmentsModel');
let validator;


module.exports.construct = function (body_parser) {

    //getting validator from app.js
    validator=module.exports.validator;


    router.get('/', function(req, res) {
        console.log("Entered GET departments")
        departmentsModel.getAll().then(function (result) {
            console.log("Entered Ended departments")
            res.send(result)
        });
    });
    router.get('/:id', function(req, res) {
        if(!validator.isInt(req.params.id)){
            res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
        }
        console.log("Entered GET departments")
        departmentsModel.getByID(req.params.id).then(function (result) {
            console.log("Entered Ended departments")
            res.send(result)
        });
    });

    router.get('/:name', function(req, res) {
        if(!validator.isAlpha(req.params.name)){
            res.send({Message :"Name \'"+ req.params.name+"\' not in the correct format"})
        }
        console.log("Entered GET departments")
        departmentsModel.getByID(req.params.name).then(function (result) {
            console.log("Entered Ended departments")
            res.send(result)
        });
    });



    router.post('/', function(req, res) {

        console.log(req.body);
        departmentsModel.create(req.body).then(function (result) {
            res.send(result)
        });
    });

    router.delete('/:id', function(req, res) {
        if(!validator.isInt(req.params.id)){
            res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
        }

        departmentsModel.deleteByID(req.params.id).then(function (result) {
            res.send(result)
        });
    });

    router.delete('/:name', function(req, res) {
        if(!validator.isAlpha(req.params.name)){
            res.send({Message :"Name \'"+ req.params.name+"\' not in the correct format"})
        }
        departmentsModel.deleteByName(req.params.name).then(function (result) {
            res.send(result)
        });
    });

    router.put('/:id', function(req, res) {
        if(!validator.isInt(req.params.id)){
            res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
        }

        departmentsModel.update(req.body,req.params.id).then(function (result) {
            res.send(result)
        });
    });





};

module.exports.router = router;

