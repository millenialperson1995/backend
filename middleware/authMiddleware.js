const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    logger.warn('Acesso negado: Token não fornecido');
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    // Verificação adicional, como expiração
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      logger.warn('Acesso negado: Token expirado');
      return res.status(401).json({ error: 'Token expirado' });
    }

    next();
  } catch (error) {
    logger.error('Acesso negado: Token inválido');
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authenticateToken;