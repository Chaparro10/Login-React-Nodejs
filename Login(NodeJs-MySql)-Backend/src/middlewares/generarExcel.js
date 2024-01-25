// Importa las bibliotecas necesarias
const excel = require('excel4node');
const fs = require('fs');
const path = require('path');

// Variable global para el contador de archivos
let contadorArchivos = 1;

// Define una función asincrónica llamada `generarExcel` que acepta datos, el nombre del modelo, la respuesta (res) y los encabezados de la tabla
const generarExcel = async (data, modelName, res, tableHeaders) => {
    try {
        // Crea una nueva instancia de Workbook de excel4node
        const workbook = new excel.Workbook();

        // Añade una hoja de trabajo al libro con un nombre específico
        const worksheet = workbook.addWorksheet(`Lista de ${modelName}`);

        // Escribe los encabezados en la primera fila de la hoja de trabajo
        tableHeaders.forEach((header, index) => {
            worksheet.cell(1, index + 1).string(header);
        });

        // Escribe los datos en la hoja de trabajo
        data.forEach((item, rowIndex) => {
            const dataObject = item.get({ plain: true });
            tableHeaders.forEach((header, index) => {
                const cellValue = dataObject[header] || '';
                worksheet.cell(rowIndex + 2, index + 1).string(cellValue.toString());
            });
        });

        // Carpeta en el descargas donde se guardarán los archivos
        const desktopFolder = path.join(require('os').homedir(), 'Downloads');

        //  si no existe la carpeta , si no, créala
        if (!fs.existsSync(desktopFolder)) {
            fs.mkdirSync(desktopFolder, { recursive: true });
        }


        // Generar el nombre del archivo con el contador
        const excelFilePath = path.join(desktopFolder, `${modelName}List_${contadorArchivos}.xlsx`);

        // Genera el nombre del archivo con el contador
        //const excelFilePath = `${modelName}List_${contadorArchivos}.xlsx`;

        // Incrementa el contador para el próximo archivo
        contadorArchivos++;

        // Escribe el libro en el sistema de archivos usando el nombre del archivo generado
        workbook.write(excelFilePath);

        // Envía una respuesta indicando que el archivo se ha creado correctamente
        res.status(200).json({ success: true, message: `Archivo ${excelFilePath} creado correctamente.` });

   
    } catch (error) {
        console.error(`Error al generar el Excel de ${modelName}:`, error);
        res.status(500).json({ success: false, error: `Error al generar el Excel de ${modelName}: ${error.message}` });
    }
};


module.exports = {
    generarExcel
};
