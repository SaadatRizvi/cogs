const db=require('../db');
const Sequelize=require('sequelize');

const sequelize=db.sequelize;
const projects = sequelize.define('Projects', {
    name: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    technologies: {
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
projects.sync({force: false}).then(() => {
    // Table created
    return projects.create({
        name:'ddcdsdsn.s.d.ds',
        role: 'kAsrwfsh',
        technologies: '1@gmail.com',
        joiningDate: '2014-05-04',
        leavingDate: '2015-04-04',
        empCode: 1312,

    }).then(function (done) {

    });
});
sequelize.sync();