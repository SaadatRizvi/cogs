const Sequelize=require('sequelize');

    const sequelize = new Sequelize('cogsDBNEW', 'root', 'root', {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }

    });


    sequelize
        .authenticate()
        .then(function () {
            console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
            console.error('Unable to connect to the database:', err);
        });


exports.sequelize=sequelize;