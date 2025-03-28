const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./utils/logger');
const { swaggerSpec, swaggerUi } = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333; // Mudou para 3333

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('Conectado ao MongoDB');
  })
  .catch((error) => {
    logger.error('Erro ao conectar ao MongoDB:', error);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(rateLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de erro
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro interno' });
});

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});