'use strict'

const express = require('express');
const router = express.Router();

const employeesModel= require('../models/employeeModel');


let validator;
let jwt;
module.exports.construct = function (body_parser,app) {
 console.log('test');
    validator=module.exports.validator;
    jwt=module.exports.jwt;

    router.post('/', function (req, res, next) {

        // find the user
        employeesModel.getByEmail(req.body.email)
            .then(function (user) {

                console.log(user.password);

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.password !== req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token
                    console.log("REACHED");

                    let a ={
                        email: user.email,
                        password: user.password
                    };
                    console.log(a);

                    let token = jwt.sign(a, app.get('superSecret'), {
                        // expiresIn: 60*60*24 // expires in 12 hours
                    });
                    console.log("REACHED22222222");

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });

                }

            }

        });
    });
};
module.exports.router = router;
