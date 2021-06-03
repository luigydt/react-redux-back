const { DataTypes } = require('sequelize');
const db = require('../database/connection')

const Usuario = db.define('Usuario', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false,
        tableName: 'usuarios'
    });



module.exports = Usuario;