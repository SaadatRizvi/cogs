
'use strict';

const db=require('../db');
const Sequelize=require('sequelize');
const sequelize=db.sequelize;
const employee=require('./employee.js').employee;

class ContactModel{


    constructor(){

        this.contactDetails = sequelize.define('ContactDetails', {
            cnic: {
                type: Sequelize.STRING, unique: true
            },
            personalEmail: {
                type: Sequelize.STRING, unique: true
            },
            skype: {
                type: Sequelize.STRING, unique: true
            },
            phoneNumber: {
                type: Sequelize.STRING, unique: true
            },
            mobileNumber: {
                type: Sequelize.STRING, unique: true
            },
            emergencyName: {
                type: Sequelize.STRING
            },
            emergencyRelation: {
                type: Sequelize.STRING
            },
            emergencyNumber: {
                type: Sequelize.STRING
            },
            emergencyAddress: {
                type: Sequelize.STRING
            },
        },{
            timestamps: false,
            freezeTableName:true
        });


        employee.hasMany(this.contactDetails)
        this.contactDetails.belongsTo(employee)

// force: true will drop the table if it already exists
        this.contactDetails.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        let defaultVals =Object.assign({}, data);
        delete defaultVals.EmployeeID;
        return this.contactDetails
            .findOrCreate({where: {EmployeeID: data.EmployeeID},defaults:defaultVals})
            .spread((contactDetails, created) => {
                console.log(contactDetails.get({
                    plain: true
                }));
                return created;

            })};

    getAll() {
        return this.contactDetails
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.contactDetails
            .findById(id).then(contactDetails => {
                return contactDetails;
            })
    };
    update(data,id) {
        return this.contactDetails.update(
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
        return this.contactDetails.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new ContactModel();


