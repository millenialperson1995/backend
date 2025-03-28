const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('O nome de usuário é obrigatório'),
  check('email').isEmail().withMessage('E-mail inválido'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('As senhas não coincidem');
    }
    return true;
  }),
];

const validateLogin = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('O nome de usuário é obrigatório'),
  check('password').not().isEmpty().withMessage('A senha é obrigatória'),
];

module.exports = { validateRegister, validateLogin };
