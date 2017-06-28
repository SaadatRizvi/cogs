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


    static set(req,res) {



        return function (req,res) {

            let check = true;

            if(req.body.id) {

                res.send({Message: "Remove the field \' id \' from the request object"})
                check=false;

            };

            if(req.body.joiningDate) {
                if (!module.exports.validator.isDateNS(req.body.joiningDate)) {
                    res.send({Message: "joiningDate \'" + req.body.joiningDate + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.leavingDate) {
                if (!module.exports.validator.isDateNS(req.body.leavingDate)) {
                    res.send({Message: "leavingDate \'" + req.body.leavingDate + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.joiningDate && req.body.leavingDate) {

                if (!module.exports.validator.isAfter(req.body.leavingDate,req.body.joiningDate)) {
                    res.send({Message: "Leaving Date should be after joining Date"})
                    check=false;
                }
            }

            if(req.body.EmployeeId) {


                if (!module.exports.validator.isInt(req.body.EmployeeId)) {
                    res.send({Message: "EmployeeId \'" + req.body.EmployeeId + "\' not in the correct format"})
                    check=false;
                }

            }
            if(check){
            console.log(req.body);
            employmentsModel.create(req.body).then(function (result) {
                res.send(result)
            });}
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



    static update (req,res) {
        return function(req, res) {
            let check = true;
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
                check=false;
            }


            if(req.body.id) {

                res.send({Message: "Remove the field \' id \' from the request object"})

            };

            if(req.body.joiningDate) {
                if (!module.exports.validator.isDateNS(req.body.joiningDate)) {
                    res.send({Message: "joiningDate \'" + req.body.joiningDate + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.leavingDate) {
                if (!module.exports.validator.isDateNS(req.body.leavingDate)) {
                    res.send({Message: "leavingDate \'" + req.body.leavingDate + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.joiningDate && req.body.leavingDate) {

                if (!module.exports.validator.isAfter(req.body.leavingDate,req.body.joiningDate)) {
                    res.send({Message: "Leaving Date should be after joining Date"})
                }
            }

            if(req.body.EmployeeId) {


                if (!module.exports.validator.isInt(req.body.EmployeeId)) {
                    res.send({Message: "EmployeeId \'" + req.body.EmployeeId + "\' not in the correct format"})
                }

            }
            if(check){


            employmentsModel.update(req.body,req.params.id).then(function (result) {
                res.send(result)
            });}
        }
    }
}
