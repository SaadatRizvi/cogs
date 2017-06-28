'use strict';


const projectsModel= require('../models/projectModel');
//const validator=module.exports.validator;

module.exports=class projectsServices{

    static getAll(req,res) {
        return function (req,res) {
            console.log("Entered GET projects");
            projectsModel.getAll().then(function (result) {
                console.log("Entered Ended projects");
                res.send(result)
            })
        }

    }

    static getById(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            console.log("Entered GET projects")
            projectsModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended projects")
                res.send(result)
            });
        }
    }



    static set(req,res) {
        return function (req,res) {
            console.log(req.body);
            projectsModel.create(req.body).then(function (result) {
                res.send(result)
            });
        }
    }

    static deleteById (req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }

            projectsModel.deleteByID(req.params.id).then(function (result) {
                if(result==1)
                    res.send({message:'done'})
                else
                    res.send({message:'ID not found'})
            });
        }
    }



    static update (req,res) {
        return function(req, res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            projectsModel.update(req.body,req.params.id).then(function (result) {
                res.send(result)
            });
        }
    }
}
