const { Sequelize } = require('sequelize');

const dataBase = process.env.DB
const username = process.env.USERNAME_DB
const password = process.env.PASSWORD
const host = process.env.HOST
const port = process.env.PORT_DB
const dialect = process.env.DIALECT

const db = new Sequelize(dataBase, username, password, {
    host,
    dialect,
    port,
});



module.exports = db;
