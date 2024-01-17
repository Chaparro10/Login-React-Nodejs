
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Usuario = sequelize.define('usuarios', {
    idusuarios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,//Desabilita los campos de tiempo
  tableName: 'usuarios' 
});

module.exports = Usuario;