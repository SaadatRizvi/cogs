const db=require('../db');
const Sequelize=require('sequelize');

const sequelize=db.sequelize;
const Department = sequelize.define('Departments', {

    name: {
        type: Sequelize.STRING, unique: true
    },
},{
    timestamps: false,
    freezeTableName:true
});
Department.sync({force: false}).then(() => {
    // Table created
    return Department.create({
        name: 'Development'

    });
});


