'use strict';


const db=require('../configs/db');
const Sequelize=require('sequelize');
const employee=require('./employeeModel');
const sequelize=db.sequelize;


class EmploymentModel{


    constructor(){

        this.Employment  = sequelize.define('Employments', {
            company: {
                type: Sequelize.STRING, allowNull: false
            },
            title: {
                type: Sequelize.STRING, allowNull: false
            },
            location: {
                type: Sequelize.STRING
            },
            joiningDate: {
                type: Sequelize.DATEONLY, allowNull: false
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
            .findOrCreate({where: {EmployeeId: data.EmployeeId,company:data.company,joiningDate: data.joiningDate},defaults: defaultVals})
            .spread((employment, created) => {
                // console.log(address.get({
                //     plain: true
                // }));
                let returnObj=Object.assign({created: created},employment.get({
                    plain: true
                }));
                console.log('Return OBJ: '+returnObj);
                return returnObj
            }).catch(err=>err)};

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
    getByQuery(data){
        return this.Employment
            .findAll({where:data}).then(project => {
                return project;
            });
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


}

module.exports=new EmploymentModel();

