/**
 * Created by saadat on 6/22/17.
 */

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db=require('./db');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



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

