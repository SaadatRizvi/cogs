const db=require('../db');
const Sequelize=require('sequelize');

const sequelize=db.sequelize;
const contactDetails = sequelize.define('ContactDetails', {
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
    empCode: {
        type: Sequelize.INTEGER, unique: true
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

// force: true will drop the table if it already exists
contactDetails.sync({force: false}).then(() => {
    // Table created
    return contactDetails.create({
        cnic: '4231221321',
        personalEmail: 'han1cock@gmail.com',
        skype: '1@gmail.com',
        phoneNumber: '021165165',
        mobileNumber: '021165165',
        empCode: 1000,
        emergencyAddress: 'mresd',
        emergencyName: 'Saasd',
        emergencyRelation: 'single',
        emergencyNumber: '965964',


    }).then(function (done) {
        console.log(done)
    });
});
sequelize.sync();