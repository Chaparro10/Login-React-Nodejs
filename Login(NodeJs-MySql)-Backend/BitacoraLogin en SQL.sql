create table persona(
id int primary key,
Nombre varchar(20),
Email varchar(20)
);


INSERT INTO persona VALUES (1, 'pedro', 'pedro@gmail.com');


CREATE TABLE BitacoraLogin (
    id INT,
    Email VARCHAR(255)
);

INSERT INTO BitacoraLogin (id, Email)
SELECT id, Email
FROM persona;


ALTER TABLE BitacoraLogin
ADD FechaUltimoIngresoPorDias DATETIME;

select * from BitacoraLogin;

DROP PROCEDURE sp_ActualizarUltimoInicioSesionDelDia;

---PROCEDIMIENTO ALMACENADO

CREATE PROCEDURE sp_ActualizarUltimoInicioSesionDelDia (
    @NumeroEmpleado INT
)
AS
BEGIN
    DECLARE @FechaActual DATETIME;
    DECLARE @emailUsuario VARCHAR(255); -- Debes definir el tipo de datos para la columna email
    --SET @FechaActual = GETDATE();
    SET @FechaActual = '2024-02-05 00:10:05';

    -- Verificar si ya existe un registro para el empleado en la fecha actual
    IF EXISTS (
        SELECT *
        FROM BitacoraLogin
        WHERE id = @NumeroEmpleado
          AND CAST(FechaUltimoIngresoPorDias AS DATE) = CAST(@FechaActual AS DATE)
    )
    BEGIN
        -- Si existe, actualizar la fecha de inicio de sesión
        UPDATE BitacoraLogin
        SET FechaUltimoIngresoPorDias = @FechaActual
        WHERE id = @NumeroEmpleado
          AND CAST(FechaUltimoIngresoPorDias AS DATE) = CAST(@FechaActual AS DATE);
    END
    ELSE
    BEGIN
        -- Si no existe, obtener el email del usuario
        SELECT @EmailUsuario = Email
        FROM BitacoraLogin 
        WHERE id = @NumeroEmpleado;

        -- Insertar un nuevo registro solo si se encontró un email válido
        IF @EmailUsuario IS NOT NULL
        BEGIN
            INSERT INTO BitacoraLogin (id, Email, FechaUltimoIngresoPorDias)
            VALUES (@NumeroEmpleado, @EmailUsuario, @FechaActual);
        END
    END
END;


EXEC sp_ActualizarUltimoInicioSesionDelDia @NumeroEmpleado = 1;

select * from BitacoraLogin

