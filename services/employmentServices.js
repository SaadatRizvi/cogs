'use strict';


const employmentsModel= require('../models/employmentModel');
//const validator=module.exports.validator;

module.exports=class employmentsServices{

    static getAll(req,res) {
        return function (req,res) {
            console.log("Entered GET employments");
            employmentsModel.getAll().then(function (result) {
                console.log("Entered Ended employments");
                res.send(result)
            })
        }

    }

    static getById(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            console.log("Entered GET employments")
            employmentsModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended employments")
                res.send(result)
            });
        }
    }

    static getByName(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isAlpha(req.params.name)){
                res.send({Message :"Name \'"+ req.params.name+"\' not in the correct format"})
            }
            console.log("Entered GET employments")
            employmentsModel.getByID(req.params.name).then(function (result) {
                console.log("Entered Ended employments")
                res.send(result)
            });
        }
    }

    static set(req,res) {
        return function (req,res) {
            console.log(req.body);
            employmentsModel.create(req.body).then(function (result) {
                res.send(result)
            });
        }
    }

    static deleteById (req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }

            employmentsModel.deleteByID(req.params.id).then(function (result) {
                if(result==1)
                    res.send({message:'done'})
                else
                    res.send({message:'ID not found'})
            });
        }
    }

    static deleteByName (req,res) {
        return function(req, res) {
            if (!module.exports.validator.isAlpha(req.params.name)) {
                res.send({Message: "Name \'" + req.params.name + "\' not in the correct format"})
            }
            employmentsModel.deleteByName(req.params.name).then(function (result) {
                res.send(result)
            });
        }
    }

    static update (req,res) {
        return function(req, res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            employmentsModel.update(req.body,req.params.id).then(function (result) {
                res.send(result)
            });
        }
    }
}
