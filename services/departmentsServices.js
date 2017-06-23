const departmentsModel= require('../models/departmentsModel');


module.exports=function getAll(req, res) {
    console.log("Entered GET departments")
    departmentsModel.getAll().then(function (result) {
        console.log("Entered Ended departments")
        res.send(result)
    });
};

class departmentsServices{

    static getAll(req,res) {
    console.log("Entered GET departments")
    departmentsModel.getAll().then(function (result) {
    console.log("Entered Ended departments")
    res.send(result)
}

}