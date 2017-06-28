const db=require('../db');
const Sequelize=require('sequelize');
const employee=require('./employeeModel.js').employee
const sequelize=db.sequelize;
const address = sequelize.define('Address', {
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
employee.hasMany(address)
address.belongsTo(employee)
// force: true will drop the table if it already exists
address.sync({force: false})
// .then(() => {
//     // Table created
//     return address.create({
//         street:'ddcdsdsn.s.d.ds',
//         city: 'kAsrwfsh',
//         country: '1@gmail.com',
//         type: '021165165',
//         empCode: 1312,
//
//     }).then(function (done) {
//         console.log(done)
//     });
// });
sequelize.sync();

exports.addressModel=address;