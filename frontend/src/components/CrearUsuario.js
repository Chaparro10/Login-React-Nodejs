import React, { useState } from 'react';
import axios from 'axios';
import Notificacion from './Notificacion';
import LoginUsuario from './LoginUsuario';
import { useNavigate } from 'react-router-dom';

const CrearUsuario = () => {
  const navigate = useNavigate(); // Hook para navegación
  const valorInicial = {
    password: '',
    email: '',
    rol: '',
  };

  const [usuario, setUsuario] = useState(valorInicial);
  const [mostrar, setMostrar] = useState(false);//Variable de estado Para controlar los errores(Para saber cuando mostrar la alerta)
  const [alertaTipo, setAlertaTipo] = useState(''); // Tipo de alerta (success o error)
  const [alertaMensaje, setAlertaMensaje] = useState(''); // Mensaje de la alerta
  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  }

  const guardarDatos = async (e) => {
    e.preventDefault();

    const newUser = {
      password: usuario.password,
      email: usuario.email,
      rol: usuario.rol
    };

    try {
      console.log("Aqui estoy");
      await axios.post('http://localhost:3000/api/usuarios/registro', newUser);
      setUsuario({ ...valorInicial });
      console.log('Usuario creado correctamente.');
      setAlertaTipo('success');
      setAlertaMensaje('Usuario creado correctamente');
    } catch (error) {
      console.error('Error:', error.message);
      setAlertaTipo('error');
      setAlertaMensaje('Error al crear usuario');
    } finally {
      setMostrar(true);
    }
  }

  return (
    <div className='col-md-6 offset-md-3'>
      <div className='card card-body'>

        <div className={`alert alert-${alertaTipo}`} role="alert">
          {mostrar && <Notificacion mensaje={alertaMensaje} />}
        </div>

        <form onSubmit={guardarDatos}>
          <h2 className='text-center'>Crear Usuario</h2>
          <div className='mb-3'>
            <label>
              Password:
            </label>

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

          <div className='mb-3'>
            <label>
              Correo:
            </label>

            <input
              type='email'
              className='form-control'
              placeholder='Ingresa el Email'
              name='email'
              value={usuario.email}
              required
              onChange={capturarDatos}
            />


          </div>
          <div className='mb-3'>
            <label>
              ROL:
            </label>

            <select
              className='form-control'
              name='rol'
              value={usuario.rol}
              required
              onChange={capturarDatos}
            >
              <option value='' disabled>Selecciona el rol</option>
              <option value='admin'>Admin</option>
              <option value='usuario'>Usuario</option>
              {/* Agregar más opciones según sea necesario */}
            </select>

          </div>

          <button className='btn btn-primary form-control mt-2'>
            Guardar Usuario
          </button>
        </form>

        <div className="mt-3">
          ¿Ya tienes una cuenta?{' '}
          <button className="btn btn-link" onClick={() => navigate('/')}>
            Inicia Sesión
          </button>
        </div>

      </div>
    </div>

  )
}

export default CrearUsuario;
