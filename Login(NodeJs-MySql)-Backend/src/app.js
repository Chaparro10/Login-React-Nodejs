const express = require('express');
require('dotenv').config();
const sequelize = require('./database/db.js');
const verificarToken = require('./middlewares/verificarToken');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/routeUsuario.js'));

sequelize.sync()
  .then(() => {
    console.log('Base de datos MySQL sincronizada');
    app.listen(port, () => {
      console.log(`Servidor en ejecución en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
