const db=require('../db');
const Sequelize=require('sequelize');

const sequelize=db.sequelize;
const employments = sequelize.define('Employments', {
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
    },

    empCode: {
        type: Sequelize.INTEGER
    },
},{
    timestamps: false,
    freezeTableName:true
});

// force: true will drop the table if it already exists
employments.sync({force: false}).then(() => {
    // Table created
    return employments.create({
        company:'ddcdsdsn.s.d.ds',
        title: 'sddsdsd',
        location: '1@gmail.com',
        joiningDate: '2014-05-04',
        leavingDate: '2015-04-04',
        empCode: 1312,

    }).then(function (done) {

    });
});
sequelize.sync();