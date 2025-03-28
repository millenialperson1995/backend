const logger = require('../utils/logger');

const protectedRoute = (req, res) => {
  logger.info(`Acesso à rota protegida - Usuário ID: ${req.userId}`);
  res.json({ message: 'Esta é uma rota protegida' });
};

module.exports = { protectedRoute };