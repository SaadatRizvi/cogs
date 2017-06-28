'use strict';


const db=require('../db');
const Sequelize=require('sequelize');
const departments=require('./departmentModel');
const sequelize=db.sequelize;


class EmployeeModel{



    constructor(){

        this.Employee  = sequelize.define('Employees', {
            code: {
                type: Sequelize.INTEGER, unique: true
            },
            name: {
                type: Sequelize.STRING
            },
            designation: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING, unique: true
            },
            tenure: {
                type: Sequelize.FLOAT
            },
            gender: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.DATEONLY
            },
            maritalStatus: {
                type: Sequelize.STRING
            },
            manager: {
                type: Sequelize.STRING
            },
            joiningDate: {
                type: Sequelize.DATEONLY
            },
            lastDate: {
                type: Sequelize.DATEONLY
            },
            status: {
                type: Sequelize.STRING
            },
            seatNo: {
                type: Sequelize.STRING, unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.BOOLEAN
            }

        },{
            timestamps: false,
            freezeTableName:true
        });

        departments.Department.hasMany(this.Employee);
        this.Employee.belongsTo(departments.Department);
// force: true will drop the table if it already exists
        this.Employee.sync({force: false}).then(function () {
            console.log('Employees Table created')
        });
    }

    create(data){
        let defaultVals =Object.assign({}, data);
        delete defaultVals.code;
        return this.Employee
            .findOrCreate({where: {code: data.code}, defaults: defaultVals})
            .spread((employee, created) => {
                console.log(employee.get({
                    plain: true
                }));
                return created;

            })
    };

    getAll() {
        return this.Employee
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.Employee
            .findById(id).then(employee => {
                return employee;
            })
    };

    update(data,id) {
        return this.Employee.update(
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
        return this.Employee.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new EmployeeModel();

