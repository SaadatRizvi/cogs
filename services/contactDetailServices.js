'use strict';


const contactDetailModel= require('../models/contactDetailModel');
//const validator=module.exports.validator;

module.exports=class contactDetailServices{

    static getAll(req,res) {

        return function (req,res) {
            if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
                contactDetailModel.getAll().then(function (result) {
                    res.send(result)
                })
            }
            else{
                console.log(req.query);
                contactDetailModel.getByQuery(req.query).then(function (result) {
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
            console.log("Entered GET contact details")
            contactDetailModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended contact details")
                res.send(result)
            });
        }
    }

    static set(req,res) {
        return function (req,res) {
            let check = true;
            if (req.body.personalEmail) {
                if (!module.exports.validator.isEmail(req.body.personalEmail)) {
                    res.send({Message: "Email \'" + req.body.personalEmail + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.phoneNumber) {
                if (!module.exports.validator.isInt(req.body.phoneNumber)) {
                    res.send({Message: "Phone number \'" + req.body.phoneNumber + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.mobileNumber) {
                if (!module.exports.validator.isInt(req.body.mobileNumber)) {
                    res.send({Message: "Mobile number \'" + req.body.mobileNumber + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.emergencyName) {
                if (!module.exports.validator.isAscii(req.body.emergencyName)) {
                    res.send({Message: "Emergency name \'" + req.body.emergencyName + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.emergencyRelation) {
                if (!module.exports.validator.isAlpha(req.body.emergencyRelation)) {
                    res.send({Message: "Emergency relation \'" + req.body.emergencyRelation + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.emergencyNumber) {
                if (!module.exports.validator.isInt(req.body.emergencyNumber)) {
                    res.send({Message: "Emergency number \'" + req.body.emergencyNumber + "\' not in the correct format"})
                    check=false;

                }
            }

            if (!req.body.EmployeeId) {
                res.send({Message: "Please provide Employee Id"})
                check=false;
            }
            else if (req.body.EmployeeId) {
                if (!module.exports.validator.isInt(req.body.EmployeeId)) {
                    res.send({Message: "ID \'" + req.params.id + "\' not in the correct format"})
                    check=false;

                }
            }

            if(check) {
                console.log(req.body);
                contactDetailModel.create(req.body).then(function (result) {
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

            contactDetailModel.deleteByID(req.params.id).then(function (result) {
                if(result==1)
                    res.send({message:'done'})
                else
                    res.send({message:'ID not found'})
            });
        }
    }

    static update (req,res) {
        return function(req, res) {
            let check=true;
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
                check=false;

            }
            if (req.body.personalEmail) {
                if (!module.exports.validator.isEmail(req.body.personalEmail)) {
                    res.send({Message: "Email \'" + req.body.personalEmail + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.phoneNumber) {
                if (!module.exports.validator.isInt(req.body.phoneNumber)) {
                    res.send({Message: "Phone number \'" + req.body.phoneNumber + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.mobileNumber) {
                if (!module.exports.validator.isInt(req.body.mobileNumber)) {
                    res.send({Message: "Mobile number \'" + req.body.mobileNumber + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.emergencyName) {
                if (!module.exports.validator.isAscii(req.body.emergencyName)) {
                    res.send({Message: "Emergency name \'" + req.body.emergencyName + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.emergencyRelation) {
                if (!module.exports.validator.isAlpha(req.body.emergencyRelation)) {
                    res.send({Message: "Emergency relation \'" + req.body.emergencyRelation + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.emergencyNumber) {
                if (!module.exports.validator.isInt(req.body.emergencyNumber)) {
                    res.send({Message: "Emergency number \'" + req.body.emergencyNumber + "\' not in the correct format"})
                    check=false;

                }
            }

            if(check) {
                contactDetailModel.update(req.body, req.params.id).then(function (result) {
                    res.send(result)
                });
            }
        }
    }
}
