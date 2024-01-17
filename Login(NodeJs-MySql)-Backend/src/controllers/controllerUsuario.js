const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const registrarUsuario = async (req, res) => {
  try {
    const { email, password, rol } = req.body;
    const existingUser = await Usuario.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({ email, password: hashedPassword, rol });

    res.status(201).json({ success: true, message: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ success: false, error: 'Error al registrar usuario.' });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
    }

    const secretKey = process.env.JWT_SECRET || 'clavesecreta';
    const token = jwt.sign({ id: user.idusuarios, email: user.email,rol:user.rol }, secretKey, { expiresIn: '1h' });



    res.json({ success: true, message: 'Inicio de sesión exitoso.', token });
    console.log(token);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, error: 'Error al iniciar sesión.' });
  }
};

const MostrarUsuarios = async (req, res) => {
  try {
    const userRole = req.user.rol;
    console.log("rol:" + userRole);
    const isAdmin = userRole === 'admin';

    if (isAdmin) {
      const usuarios = await Usuario.findAll();
      res.json({ success: true, data: usuarios });
    } else {
      res.status(403).json({ success: false, message: 'Acceso denegado' });
    }
  } catch (error) {
    console.error('Error de Sequelize:', error);
    res.status(500).json({ success: false, error: 'Error al obtener usuarios: ' + error.message });
  }
};





module.exports = {
  registrarUsuario,
  iniciarSesion,
  MostrarUsuarios
};
