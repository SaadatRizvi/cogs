const departmentsModel= require('../models/departmentsModel');
//const validator=module.exports.validator;

module.exports=class departmentsServices{

    static getAll(req,res) {
        return function (req,res) {
            console.log("Entered GET departments");
            departmentsModel.getAll().then(function (result) {
                console.log("Entered Ended departments");
                res.send(result)
            })
        }

    }

    static getById(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            console.log("Entered GET departments")
            departmentsModel.getByID(req.params.id).then(function (result) {
                console.log("Entered Ended departments")
                res.send(result)
            });
        }
    }

    static getByName(req,res) {
        return function (req,res) {
            if(!module.exports.validator.isAlpha(req.params.name)){
                res.send({Message :"Name \'"+ req.params.name+"\' not in the correct format"})
            }
            console.log("Entered GET departments")
            departmentsModel.getByID(req.params.name).then(function (result) {
                console.log("Entered Ended departments")
                res.send(result)
            });
        }
    }

    static set(req,res) {
        return function (req,res) {
            console.log(req.body);
            departmentsModel.create(req.body).then(function (result) {
                res.send(result)
            });
        }
    }

    static deleteById (req,res) {
        return function (req,res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }

            departmentsModel.deleteByID(req.params.id).then(function (result) {
                if(result==1)
                    res.send({message:'done'})
                else
                    res.send({message:'ID not found'})
            });
        }
    }

    static deleteByName (req,res) {
        return function(req, res) {
            if (!module.exports.validator.isAlpha(req.params.name)) {
                res.send({Message: "Name \'" + req.params.name + "\' not in the correct format"})
            }
            departmentsModel.deleteByName(req.params.name).then(function (result) {
                res.send(result)
            });
        }
    }

    static update (req,res) {
       return function(req, res) {
            if(!module.exports.validator.isInt(req.params.id)){
                res.send({Message :"ID \'"+ req.params.id+"\' not in the correct format"})
            }
            departmentsModel.update(req.body,req.params.id).then(function (result) {
                res.send(result)
            });
        }
    }
}
