import React, { useState } from 'react';
import axios from 'axios';
import Notificacion from './Notificacion';
import { useNavigate} from 'react-router-dom';



const LoginUsuario = () => {
  const navigate = useNavigate(); // Hook para navegación
  const valorInicial = {
    password: '',
    email: ''
  };

  const [usuario, setUsuario] = useState(valorInicial);
  const [mostrar, setMostrar] = useState(false);//Variable de estado Para controlar los errores(Para saber cuando mostrar la alerta)
  const [alertaTipo, setAlertaTipo] = useState(''); // Tipo de alerta (success o error)
  const [alertaMensaje, setAlertaMensaje] = useState(''); // Mensaje de la alerta

  const capturarDatos = (e) => {//Captura los datos del formulario
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    const userData = {
      password: usuario.password,
      email: usuario.email
    };

    try {
      // Hacer la solicitud POST para iniciar sesión
      const response = await axios.post('http://localhost:3000/api/usuarios/iniciar-sesion', userData);


      // Comprobar si el inicio de sesión fue exitoso
      if (response.data.success) {
        // Limpiar el formulario y mostrar un mensaje de éxito
        console.log(response.data);
        setUsuario({ ...valorInicial });
        setAlertaTipo('success');
        setAlertaMensaje('Inicio de sesión exitoso');
        // Redirige a la página ListarUsuarios
        navigate('/ListarUsuarios');

      } else {
        // Mostrar un mensaje de error si el inicio de sesión falló
        setAlertaTipo('error');
        setAlertaMensaje('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setAlertaTipo('error');
      setAlertaMensaje('Error al iniciar sesión');
    } finally {
      setMostrar(true);
    }
  };

  return (
    <div className='col-md-6 offset-md-3'>
      <div className='card card-body'>
        <div className={`alert alert-${alertaTipo}`} role="alert">
          {mostrar && <Notificacion mensaje={alertaMensaje} />}
        </div>

        <form onSubmit={iniciarSesion}>
          <h2 className='text-center'>Iniciar Sesión</h2>
          <div className='mb-3'>
            <label>Correo:</label>
            <input
              type='email'
              className='form-control'
              placeholder='Ingresa el correo'
              name='email'
              value={usuario.email}
              required
              onChange={capturarDatos}
            />
          </div>

          <div className='mb-3'>
            <label>Contraseña:</label>
            <input
              type='password'
              className='form-control'
              placeholder='Ingresa la contraseña'
              name='password'
              value={usuario.password}
              required
              onChange={capturarDatos}
            />
          </div>

          <button className='btn btn-primary form-control mt-2'>
            Iniciar Sesión
          </button>

        </form>

        <div className="mt-3">
          ¿No tienes una cuenta?{' '}
          <button className="btn btn-link" onClick={() => navigate('/CrearUsuario')}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUsuario;
