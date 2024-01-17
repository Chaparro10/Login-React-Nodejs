const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('recursos_humanos_db', 'root','Chaparro07' , {
  host: 'localhost', // Host de tu servidor MySQL
  dialect: 'mysql' // Tipo de base de datos
});

module.exports = sequelize;