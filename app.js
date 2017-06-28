/**
 * Created by saadat on 6/22/17.
 */

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db=require('./db');
const validator = require('validator');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function isDate(testDate) {
    //var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    var date_regex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;

    if(!(date_regex.test(testDate)))
    {
        return false;
    }
    return true;
}

validator.isDateNS=isDate;

const departments=require('./controllers/departmentController');
const employees=require('./controllers/employeeController');
const employments=require('./controllers/employmentController');
const projects=require('./controllers/projectController');
const address=require('./controllers/addressController');
const contactDetail=require('./controllers/contactDetailController');
const education=require('./controllers/educationController');

departments.validator = validator;
departments.construct(bodyParser);
employees.validator = validator;
employees.construct(bodyParser);
employments.validator = validator;
employments.construct(bodyParser);
projects.validator = validator;
projects.construct(bodyParser);
address.validator = validator;
address.construct(bodyParser);
contactDetail.validator = validator;
contactDetail.construct(bodyParser);
education.validator = validator;
education.construct(bodyParser);

app.use('/departments', departments.router)
app.use('/employees', employees.router)
app.use('/address', address.router)
app.use('/contactDetail', contactDetail.router)
app.use('/education', education.router)

app.get("/", function (request,response) {
        response.send('Hello World');
});
app.get("/login", function (request,response) {
    response.render('index.ejs');
})

app.get("/signup", function (request,response) {
    response.render('signup.ejs');
})

app.post("/login", function (req,res) {
    res.render('dashboard.ejs',{
        userName:req.body.email
    });
})

app.post("/signup", function (req,res){
    console.log("Rendering dashboard.ejs");
    res.render('dashboard.ejs',{
        userName:req.body.fname
    });
})

app.listen(8089,function () {
    console.log('Server has started, listening on port 8089');
});

