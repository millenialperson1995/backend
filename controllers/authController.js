const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    logger.info(`Usuário registrado com sucesso - ${username}`);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    logger.error(`Erro ao registrar usuário - ${error.message}`);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      logger.warn(
        `Tentativa de login falha: Usuário não encontrado - ${username}`,
      );
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`Tentativa de login falha: Senha incorreta - ${username}`);
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    logger.info(`Login bem-sucedido - ${username}`);
    res.json({ token });
  } catch (error) {
    logger.error(`Erro ao fazer login - ${error.message}`);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

module.exports = { register, login };
