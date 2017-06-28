
'use strict';

const db=require('../db');
const Sequelize=require('sequelize');
const employee=require('./employee.js').employee;
const sequelize=db.sequelize;

class AddressModel{


    constructor(){

        this.address = sequelize.define('Address', {
            street: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            }
        },{
            timestamps: false,
            freezeTableName:true
        });
        employee.hasMany(this.address);
        this.address.belongsTo(employee);

        this.address.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        let defaultVals=Object.assign({},data);
        delete defaultVals.EmployeeID;
        delete defaultVals.type;

        return this.address
            .findOrCreate({where: {EmployeeID: data.EmployeeID,type: data.type},defaults:defaultVals})
            .spread((address, created) => {
                console.log(address.get({
                    plain: true
                }));
                return created;

            })};

    getAll() {
        return this.address
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.address
            .findById(id).then(address => {
                return address;
            })
    };
    update(data,id) {
        return this.address.update(
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
        return this.address.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new AddressModel();

