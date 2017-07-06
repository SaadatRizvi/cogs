
'use strict';

const db=require('../configs/db');
const Sequelize=require('sequelize');
const employee=require('./employeeModel.js').Employee;
const sequelize=db.sequelize;

class AddressModel{


    constructor(){

        this.Address = sequelize.define('Address', {
            street: {
                type: Sequelize.STRING ,allowNull:false
            },
            city: {
                type: Sequelize.STRING ,allowNull:false
            },
            country: {
                type: Sequelize.STRING ,allowNull:false
            },
            type: {
                type: Sequelize.STRING ,allowNull:false
            }
        },{
            timestamps: false,
            freezeTableName:true
        });
        employee.hasMany(this.Address);
        this.Address.belongsTo(employee);

        this.Address.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        let defaultVals=Object.assign({},data);
        delete defaultVals.EmployeeID;
        delete defaultVals.type;

        return this.Address
            .findOrCreate({where: {EmployeeId: data.EmployeeId,type: data.type},defaults:defaultVals})
            .spread((address, created) => {
                console.log(address.get({
                    plain: true
                }));
                return address.get({
                    plain: true
                });

            }).catch(err=>err)};

    getAll() {
        return this.Address
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.Address
            .findById(id).then(address => {
                return address;
            })
    };
    getByQuery(data){
        return this.Address
            .findAll({where:data}).then(project => {
                return project;
            });
    };
    update(data,id) {
        return this.Address.update(
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
        return this.Address.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new AddressModel();

