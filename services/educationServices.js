'use strict';


const educationModel= require('../models/educationModel');
//const validator=module.exports.validator;
module.exports=class educationServices{

    static getAll(req,res) {

        return function (req,res) {
            if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
                educationModel.getAll().then(function (result) {
                    res.send(result)
                })
            }
            else{
                console.log(req.query);
                educationModel.getByQuery(req.query).then(function (result) {
                    console.log(result)
                    res.send(result);
                })

            }
        }

    }

    static getById(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            console.log("Entered GET education")
            educationModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended education")
                res.send(result)
            });
        }
    }

    static set(req,res) {


        return function (req,res) {
            console.log('In Set EducationServices')
            let check=true;
            if(req.body.id){
                res.send({Message: "Remove \'" + req.body.id + "\' from the input json"})
                check=false;
            }
            if(req.body.passingDate) {
                if (!module.exports.validator.isDateNS(req.body.passingDate)) {
                    res.send({Message: "Date \'" + req.body.passingDate + "\' not in the correct format"})
                    check=false;
                }
            }
            if(req.body.gpa) {
                if (!module.exports.validator.isFloat(req.body.gpa)) {
                    res.send({Message: "Gpa \'" + req.body.gpa + "\' not in the correct format"})
                    check=false;
                }
            }
            if(req.body.institute) {
                if (!module.exports.validator.isAscii(req.body.institute)) {
                    res.send({Message: "Institute \'" + req.body.institute + "\' not in the correct format"})
                    check=false;

                }
            }
            if(req.body.degree) {
                if (!module.exports.validator.isAscii(req.body.degree)) {
                    res.send({Message: "Degree \'" + req.body.degree + "\' not in the correct format"})
                    check=false;

                }
            }
            if(req.body.field) {
                if(!module.exports.validator.isAscii(req.body.field)){
                    res.send({Message :"Field \'"+ req.body.field+"\' not in the correct format"})
                    check=false;

                }
            }
            if(!req.body.EmployeeId) {
                res.send({Message :"Please provide Employee Id"})
                check=false;
            }
            else if(req.body.EmployeeId){
                if(!module.exports.validator.isInt(req.body.EmployeeId)){
                    res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
                    check=false;
                }
            }
            if(check) {
                console.log(req.body);
                educationModel.create(req.body).then(function (result) {
                    res.send(result)
                });
            }
        }
    }

    static deleteById (req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }

            educationModel.deleteByID(req.params.id).then(function (result) {
                if(result==1)
                    res.send({message:'done'})
                else
                    res.send({message:'ID not found'})
            });
        }
    }

    static update (req,res) {
        return function(req, res) {
            console.log(req.body)
            let check=true;
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
                check=false;
            }
            if(req.body.passingDate) {
                if (!module.exports.validator.isDateNS(req.body.passingDate)) {
                    res.send({Message: "Date \'" + req.body.passingDate + "\' not in the correct format"})
                    check=false;
                }
            }
            if(req.body.gpa) {
                if (!module.exports.validator.isFloat(req.body.gpa)) {
                    res.send({Message: "Gpa \'" + req.body.gpa + "\' not in the correct format"})
                    check=false;
                }
            }
            if(req.body.institute) {
                if (!module.exports.validator.isAscii(req.body.institute)) {
                    res.send({Message: "Institute \'" + req.body.institute + "\' not in the correct format"})
                    check=false;
                }
            }
            if(req.body.degree) {
                if (!module.exports.validator.isAscii(req.body.degree)) {
                    res.send({Message: "Degree \'" + req.body.degree + "\' not in the correct format"})
                    check=false;
                }
            }
            if(req.body.field) {
                if(!module.exports.validator.isAscii(req.body.field)){
                    res.send({Message :"Field \'"+ req.body.field+"\' not in the correct format"})
                    check=false;
                }
            }
            if(check){
                console.log(req.body)
                educationModel.update(req.body, req.params.id).then(function (result) {
                    res.send(result)
                });
            }
        }
    }
}
