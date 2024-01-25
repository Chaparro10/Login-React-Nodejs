import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrearUsuario from './components/CrearUsuario';
import LoginUsuario from './components/LoginUsuario';
import ListarUsuarios from './components/Usuarios/ListarUsuarios';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <div className='container p-4'>
          <Routes>
            <Route path='/' element={<LoginUsuario />} />
            <Route path='/CrearUsuario' element={<CrearUsuario />} />
            <Route path='/ListarUsuarios' element={<ListarUsuarios/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
