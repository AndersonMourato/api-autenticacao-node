const { Sequelize } = require('sequelize');
//require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT,
    dialectOptions: {
        ssl: {
            ca: process.env.MYSQL_SSL_CA
        }
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao MySQL com SSL');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MySQL', err);
    });

module.exports = sequelize;
