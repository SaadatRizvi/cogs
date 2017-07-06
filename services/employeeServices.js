'use strict';


const employeesModel= require('../models/employeeModel');
const jwt=require('jsonwebtoken');
//const validator=module.exports.validator;

module.exports=class employeesServices{

    static getAll(req,res) {

        return function (req,res) {
            if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
                employeesModel.getAll().then(function (result) {
                    res.send(result)
                })
            }
            else{
                console.log(req.query);
                employeesModel.getByQuery(req.query).then(function (result) {
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
            console.log("Entered GET employees")
            employeesModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended employees")
                res.send(result)
            });
        }
    }

    static authenticate(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isEmail(req.body.email)){
                res.send({Message :"Email \'"+ req.body.email+"\' not in the correct format"})
            }
            console.log("Entered GET employees")
            employeesModel.getByEmail(req.body.email).then(function (user) {
                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {

                    // check if password matches
                    if (user.password != req.body.password) {
                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    } else {

                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }

                }
                })
                .catch(err=>err)
            ;
        }
    }

    static set(req,res) {
        return function (req,res) {

            let check = true;

            if(req.body.id) {

                res.send({Message: "Remove the field \' id \' from the request object"})
                check=false;
            };

            if(req.body.email) {
                if (!module.exports.validator.isEmail(req.body.email)) {
                    res.send({Message: "email \'" + req.body.email + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.joiningDate) {
                if (!module.exports.validator.isDateNS(req.body.joiningDate)) {
                    res.send({Message: "joiningDate \'" + req.body.joiningDate + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.lastDate) {
                if (!module.exports.validator.isDateNS(req.body.lastDate)) {
                    res.send({Message: "lastDate \'" + req.body.lastDate + "\' not in the correct format"});
                    check=false;
                }
            }

            if(req.body.joiningDate && req.body.lastDate) {

                if (!module.exports.validator.isAfter(req.body.lastDate,req.body.joiningDate)) {
                    res.send({Message: "Last Date should be after joining Date"})
                    check=false;
                }
            }

            if(req.body.DepartmentId) {

                if (!module.exports.validator.isInt(req.body.DepartmentId)) {
                    res.send({Message: "DepartmentId \'" + req.body.DepartmentId + "\' not in the correct format"})
                    check=false;
                }
            }

            if(req.body.code) {

                if (!module.exports.validator.isInt(req.body.code)) {
                    res.send({Message: "code \'" + req.body.code + "\' not in the correct format"})
                    check=false;
                }
            }

            if(check){
            console.log(req.body);
            employeesModel.create(req.body).then(function (result) {
                res.send(result)
            });}
        }
    }

    static deleteById (req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }

            employeesModel.deleteByID(req.params.id).then(function (result) {
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
            employeesModel.update(req.body,req.params.id).then(function (result) {
                res.send(result)
            });
        }
    }
}
