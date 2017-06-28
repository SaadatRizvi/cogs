'use strict';


const db=require('../db');
const Sequelize=require('sequelize');
const employee=require('./employeeModel');
const sequelize=db.sequelize;


class ProjectModel{


    constructor(){

        this.Project  = sequelize.define('Projects', {
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

        employee.Employee.hasMany(this.Project);
        this.Project.belongsTo(employee.Employee);

// force: true will drop the table if it already exists
        this.Project.sync({force: false}).then(function () {
            console.log('Projects Table created')
        });
    }

    create(data){
        return this.Project
            .findOrCreate({where: {EmployeeId: data.EmployeeId}})
            .spread((project, created) => {
                console.log(project.get({
                    plain: true
                }));
                return created;

            })};

    getAll() {
        return this.Project
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.Project
            .findById(id).then(project => {
                return project;
            })
    };
    getByName(name){
        return this.Project
            .findOne({where:{name:name}}).then(project => {
                return project;
            })
    };
    update(data,id) {
        return this.Project.update(
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
        return this.Project.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

    deleteByName(name) {
        return this.Project.destroy({
            where: {
                name: name
            }
        }).then(result => result);
    }



}

module.exports=new ProjectModel();

