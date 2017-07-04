'use strict';


const addressModel= require('../models/addressModel');
//const validator=module.exports.validator;

module.exports=class addressServices{

    static getAll(req,res) {

        return function (req,res) {
            if(req.query){
                console.log(req.query);
                addressModel.getByQuery(req.query).then(function (result) {
                    console.log(result)
                    res.send(result);
                })
            }
            else{
                addressModel.getAll().then(function (result) {
                    res.send(result)
                })
            }
        }

    }

    static getById(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            console.log("Entered GET address")
            addressModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended address")
                res.send(result)
            });
        }
    }

    static set(req,res) {
        return function (req,res) {
            let check=true;
            if (req.body.city) {
                if (!module.exports.validator.isAlpha(req.body.city)) {
                    res.send({Message: "City \'" + req.body.city + "\' not in the correct format"})
                    check=false;
                }
            }
            if (req.body.country) {
                if (!module.exports.validator.isAlpha(req.body.country)) {
                    res.send({Message: "Country \'" + req.body.country + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.type) {
                if (!module.exports.validator.isAlpha(req.body.type)) {
                    res.send({Message: "Type \'" + req.body.type + "\' not in the correct format"})
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
                addressModel.create(req.body).then(function (result) {
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

            addressModel.deleteByID(req.params.id).then(function (result) {
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

            if (req.body.city) {
                if (!module.exports.validator.isAlpha(req.body.city)) {
                    res.send({Message: "City \'" + req.body.city + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.country) {
                if (!module.exports.validator.isAlpha(req.body.country)) {
                    res.send({Message: "Country \'" + req.body.country + "\' not in the correct format"})
                    check=false;

                }
            }
            if (req.body.type) {
                if (!module.exports.validator.isAlpha(req.body.type)) {
                    res.send({Message: "Type \'" + req.body.type + "\' not in the correct format"})
                    check=false;

                }
            }

            if(check) {
                addressModel.update(req.body, req.params.id).then(function (result) {
                    res.send(result)
                });
            }
        }
    }
}
