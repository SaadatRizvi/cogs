'use strict';

const db=require('../db');
const Sequelize=require('sequelize');
const sequelize=db.sequelize;
const employee=require('./employee.js').employee;

class EducationModel{


    constructor(){

        this.education = sequelize.define('Education', {
            institute: {
                type: Sequelize.STRING
            },
            passingDate: {
                type: Sequelize.DATEONLY
            },
            degree: {
                type: Sequelize.STRING
            },
            field: {
                type: Sequelize.STRING
            },
            gpa: {
                type: Sequelize.FLOAT
            }
        },{
            timestamps: false,
            freezeTableName:true
        });

        employee.hasMany(this.education)
        this.education.belongsTo(employee)

// force: true will drop the table if it already exists
        this.education.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        let defaultVals =Object.assign({}, data);
        delete defaultVals.EmployeeID;
        delete defaultVals.degree;
        return this.education
            .findOrCreate({where: {EmployeeID: data.EmployeeID,degree:data.degree},defaults:defaultVals})
            .spread((education, created) => {
                console.log(education.get({
                    plain: true
                }));
                return created;

            })};

    getAll() {
        return this.education
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.education
            .findById(id).then(education => {
                return education;
            })
    };
    update(data,id) {
        return this.education.update(
            data,
            {where: {id: id}}
        )
            .then(result =>
                {return result;}
            )
            .
            catch(err =>
                {return err;}
            )
    };
    deleteByID(id) {
        return this.education.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new EducationModel();


