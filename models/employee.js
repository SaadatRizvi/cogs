const db=require('../db');
const Sequelize=require('sequelize');

const sequelize=db.sequelize;
const Employee = sequelize.define('Employees', {
    code: {
        type: Sequelize.INTEGER, unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    designation: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING, unique: true
    },
    tenure: {
        type: Sequelize.FLOAT
    },
    gender: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.DATEONLY
    },
    maritalStatus: {
        type: Sequelize.STRING
    },
    departmentId: {
        type: Sequelize.INTEGER
    },
    manager: {
        type: Sequelize.STRING
    },
    joiningDate: {
        type: Sequelize.DATEONLY
    },
    lastDate: {
        type: Sequelize.DATEONLY
    },
    status: {
        type: Sequelize.STRING
    },
    seatNo: {
        type: Sequelize.STRING, unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN
    }

},{
    timestamps: false,
    freezeTableName:true
});

// force: true will drop the table if it already exists
Employee.sync({force: false}).then(() => {
    // Table created
    return Employee.create({
        code: 1312,
        name: 'Hancock',
        designation: 'Manager',
        email: 'manager@tenpearls.com',
        tenure: 0.2,
        gender: 'm',
        dob: '1991-02-01',
        maritalStatus: 'single',
        departmentId: 1,
        joiningDate: '2017-05-22',
        status: 'Permanent',
        seatNo: '202A',
        password: '12345678',
        active: true

    });
});

exports.employee=Employee;