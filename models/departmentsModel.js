'use strict';


const db=require('../db');
const Sequelize=require('sequelize');

const sequelize=db.sequelize;

var validator = require('validator');


class DepartmentModel{


    constructor(){


        console.log(validator)

      this.Department  = sequelize.define('Departments', {

            name: {
                type: Sequelize.STRING, unique: true
            },
        },{
            timestamps: false,
            freezeTableName:true
        });

        this.Department.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        return this.Department
            .findOrCreate({where: {name: data.name}})
            .spread((department, created) => {
                console.log(department.get({
                    plain: true
                }));
                return created;

            })};

    getAll() {
        return this.Department
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.Department
            .findById(id).then(department => {
                return department;
            })
    };
    getByName(name){
        return this.Department
            .findOne({where:{name:name}}).then(department => {
                return department;
            })
    };
    update(data,id) {
        return this.Department.update(
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
        return this.Department.destroy({
            where: {
                id: id
            }
        }).then(result =>
        {return result;}
        );
    };

    deleteByName(name) {
        return this.Department.destroy({
            where: {
                name: name
            }
        }).then(result => result);
    }



}

module.exports=new DepartmentModel();


//     .then(() => {
//     // Table created
//     return Department.create({
//         name: 'Development'
//
//     });
// });




