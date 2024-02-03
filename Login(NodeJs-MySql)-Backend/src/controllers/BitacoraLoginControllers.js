// Importa el modelo BitacoraLogin
const BitacoraLogin = require('../models/BitacoraLogin');
// Importa la instancia de Sequelize
const sequelize = require('../database/db.js');

// Define la función para llamar al procedimiento almacenado
async function actualizarUltimoInicioSesionDelDia(idusuarios) {
    const query = `
        CALL sp_ActualizarUltimoInicioSesionDelDia(:NumeroEmpleado);
    `;

    try {
        await sequelize.query(query, {
            replacements: { NumeroEmpleado: idusuarios }
        });
        console.log('Procedimiento almacenado ejecutado correctamente.');
    } catch (error) {
        console.error('Error al ejecutar el procedimiento almacenado:', error);
    }
}


// Exporta las funciones del controlador
module.exports = {
    actualizarUltimoInicioSesionDelDia
};
