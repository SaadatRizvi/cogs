'use strict';


const db=require('../db');
const Sequelize=require('sequelize');
const employee=require('./employeeModel');
const sequelize=db.sequelize;


class EmploymentModel{


    constructor(){

        this.Employment  = sequelize.define('Employments', {
            company: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            location: {
                type: Sequelize.STRING
            },
            joiningDate: {
                type: Sequelize.DATEONLY
            },
            leavingDate: {
                type: Sequelize.DATEONLY
            }
        },{
            timestamps: false,
            freezeTableName:true
        });

        employee.Employee.hasMany(this.Employment);
        this.Employment.belongsTo(employee.Employee);

// force: true will drop the table if it already exists
        this.Employment.sync({force: false}).then(function () {
            console.log('Employments Table created')
        });
    }

    create(data){
        let defaultVals =Object.assign({}, data);
        delete defaultVals.EmployeeId;
        delete defaultVals.company;
        delete defaultVals.joiningDate;

        return this.Employment
            .findOrCreate({where: {EmployeeId: data.EmployeeId,company:data.company,joiningDate: data.company},defaults: defaultVals})
            .spread((employment, created) => {
                console.log(employment.get({
                    plain: true
                }));
                return created;

            })};

    getAll() {
        return this.Employment
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.Employment
            .findById(id).then(employment => {
                return employment;
            })
    };
    getByName(name){
        return this.Employment
            .findOne({where:{name:name}}).then(employment => {
                return employment;
            })
    };
    update(data,id) {
        return this.Employment.update(
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
        return this.Employment.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

    deleteByName(name) {
        return this.Employment.destroy({
            where: {
                name: name
            }
        }).then(result => result);
    }



}

module.exports=new EmploymentModel();

