'use strict';

const db=require('../configs/db');
const Sequelize=require('sequelize');
const sequelize=db.sequelize;
const employee=require('./employeeModel.js').Employee;

class EducationModel{


    constructor(){

        this.Education = sequelize.define('Education', {
            institute: {
                type: Sequelize.STRING,allowNull:false
            },
            passingDate: {
                type: Sequelize.DATEONLY,allowNull:false
            },
            degree: {
                type: Sequelize.STRING,allowNull:false
            },
            field: {
                type: Sequelize.STRING,allowNull:false
            },
            gpa: {
                type: Sequelize.FLOAT
            }
        },{
            timestamps: false,
            freezeTableName:true
        });

        employee.hasMany(this.Education)
        this.Education.belongsTo(employee)

// force: true will drop the table if it already exists
        this.Education.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        console.log('In Create 1')

        let defaultVals =Object.assign({}, data);
        delete defaultVals.EmployeeID;
        delete defaultVals.degree;
        delete defaultVals.passingDate;
        delete defaultVals.field
        console.log('In Create 2')
        return this.Education
            .findOrCreate(
                {
                    where:
                {
                    EmployeeId: data.EmployeeId,
                    degree:data.degree,
                    passingDate:data.passingDate,
                    field:data.field
                },
                    defaults:defaultVals})
            .spread((education, created) => {
                console.log(education.get({
                    plain: true
                }));
                return created;

            }).catch(err=>err)};

    getAll() {
        return this.Education
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.Education
            .findById(id).then(education => {
                return education;
            })
    };
    getByQuery(data){
        return this.Education
            .find({where:data}).then(project => {
                return project;
            });
    };
    update(data,id) {
        return this.Education.update(
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
        return this.Education.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new EducationModel();


