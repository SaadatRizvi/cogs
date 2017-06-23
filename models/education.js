const db=require('../db');
const Sequelize=require('sequelize');
const sequelize=db.sequelize;
const employee=require('./employee.js').employee

const education = sequelize.define('Education', {
    institute: {
        type: Sequelize.STRING
    },
    passingDate: {
        type: Sequelize.DATEONLY
    },
    degree: {
        type: Sequelize.STRING
    },
    field: {
        type: Sequelize.STRING
    },
    gpa: {
        type: Sequelize.FLOAT
    }
},{
    timestamps: false,
    freezeTableName:true
});

employee.hasMany(education)
education.belongsTo(employee)

// force: true will drop the table if it already exists
education.sync({force: false})
//     .then(() => {
//     // Table created
//     return education.create({
//         institute:'ddcdsdsn.s.d.ds',
//         gpa: 3.96,
//         degree: '1@gmail.com',
//         passingDate: '2014-05-04',
//         field: '2015-04-04',
//         empCode: 1312,
//
//     }).then(function (done) {
//
//     });
// });
sequelize.sync();