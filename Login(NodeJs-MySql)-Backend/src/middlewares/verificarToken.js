const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization') //|| req.headers.authorization.startsWith('Bearer');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado. Asegúrese de incluir el token en el encabezado de autorización.' });
  }

  try {
    const theToken = req.headers.authorization.split(' ')[1];
    const secretKey = process.env.JWT_SECRET || 'clavesecreta';
    const decoded = jwt.verify(theToken, secretKey);

    // Si llegamos aquí, el token es válido
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.error('Error al verificar el token:', error.message);
      return res.status(401).json({ success: false, message: 'Token no válido. Asegúrese de proporcionar un token válido y actualizado.' });
    } else if (error.name === 'TokenExpiredError') {
      console.error('Error al verificar el token:', error.message);
      return res.status(401).json({ success: false, message: 'Token expirado. Proporcione un token actualizado.' });
    } else {
      console.error('Error al verificar el token:', error.message);
      return res.status(401).json({ success: false, message: 'Error al verificar el token.' });
    }
  }
};




module.exports = {
  verificarToken
};
