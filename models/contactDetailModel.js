
'use strict';

const db=require('../configs/db');
const Sequelize=require('sequelize');
const sequelize=db.sequelize;
const employee=require('./employeeModel.js').Employee;

class ContactModel{


    constructor(){

        this.ContactDetails = sequelize.define('ContactDetails', {
            cnic: {
                type: Sequelize.STRING, unique: true,allowNull:false
            },
            personalEmail: {
                type: Sequelize.STRING, unique: true,allowNull:false
            },
            skype: {
                type: Sequelize.STRING, unique: true
            },
            phoneNumber: {
                type: Sequelize.STRING, unique: true
            },
            mobileNumber: {
                type: Sequelize.STRING, unique: true,allowNull:false
            },
            emergencyName: {
                type: Sequelize.STRING,allowNull:false
            },
            emergencyRelation: {
                type: Sequelize.STRING,allowNull:false
            },
            emergencyNumber: {
                type: Sequelize.STRING,allowNull:false
            },
            emergencyAddress: {
                type: Sequelize.STRING,allowNull:false
            },
        },{
            timestamps: false,
            freezeTableName:true
        });


        employee.hasMany(this.ContactDetails)
        this.ContactDetails.belongsTo(employee)

// force: true will drop the table if it already exists
        this.ContactDetails.sync({force: false}).then(function () {
            console.log('Departments Table created')
        });
    }

    create(data){
        let defaultVals =Object.assign({}, data);
        delete defaultVals.EmployeeID;
        return this.ContactDetails
            .findOrCreate({where: {EmployeeId: data.EmployeeId},defaults:defaultVals})
            .spread((contactDetails, created) => {
                console.log(contactDetails.get({
                    plain: true
                }));
                let returnObj=Object.assign({created: created},contactDetails.get({
                    plain: true
                }));
                return returnObj
            })
            .catch(err=>err)
    };

    getAll() {
        return this.ContactDetails
            .findAll().then(function(output){
                return output;
            });
    };
    getByID(id){
        return this.ContactDetails
            .findById(id).then(contactDetails => {
                return contactDetails;
            })
    };
    getByQuery(data){
        return this.ContactDetails
            .findAll({where:data}).then(project => {
                return project;
            });
    };
    update(data,id) {
        return this.ContactDetails.update(
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
        return this.ContactDetails.destroy({
            where: {
                id: id
            }
        }).then(result =>
            {return result;}
        );
    };

}

module.exports=new ContactModel();


