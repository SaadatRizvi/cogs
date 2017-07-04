
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db=require('./configs/db');
const validator = require('validator');
const authConfig=require('./configs/authConfig');
const morgan = require('morgan')
const jwt = require('jsonwebtoken');


function isDate(testDate) {
    //var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    var date_regex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;

    if(!(date_regex.test(testDate)))
    {
        return false;
    }
    return true
}



validator.isDateNS=isDate;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, Authorization, Content-Length, X-Requested-With,Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

});


app.use(morgan('dev'));
app.set('superSecret', authConfig.secret); // secret variable
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



const authenticate=require('./controllers/authenticateController')


const departments=require('./controllers/departmentController');
const employees=require('./controllers/employeeController');
const employments=require('./controllers/employmentController');
const projects=require('./controllers/projectController');
const address=require('./controllers/addressController');
const contactDetail=require('./controllers/contactDetailController');
const education=require('./controllers/educationController');
const authMiddleware= require('./middlewares/aunthenticate');


authMiddleware.jwt=jwt;
authMiddleware.app=app;
authenticate.validator = validator;
authenticate.jwt=jwt;

authenticate.construct(bodyParser,app);
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


app.use('/authenticate',authenticate.router);

app.use(authMiddleware);
app.use('/employees', employees.router);
app.use('/departments', departments.router);
//app.use('/employees', employees.router);
app.use('/address', address.router);
app.use('/contactDetail', contactDetail.router);
app.use('/education', education.router);
app.use('/employments', employments.router);
app.use('/projects', projects.router);




/*   // SHIT CODE
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
*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(4100,function () {
    console.log('Server has started, listening on port 4100');
});

