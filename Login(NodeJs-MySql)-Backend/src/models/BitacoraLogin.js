
const sequelize = require('../database/db.js');
const { DataTypes } = require('sequelize');


// Define el modelo BitacoraLogin
const BitacoraLogin = sequelize.define('BitacoraLogin', {
    idusuarios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaUltimoIngresoPorDias: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'BitacoraLogin',
    timestamps: false // Si tu tabla tiene timestamps, configúralo según corresponda
});

// Exporta el modelo BitacoraLogin
module.exports = BitacoraLogin;
