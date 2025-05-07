"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _Usuario = require('../models/Usuario'); var _Usuario2 = _interopRequireDefault(_Usuario);

_dotenv2.default.config();

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const usuario = await _Usuario2.default.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await usuario.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const { id } = usuario;
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.json({ token, usuario: { nome: usuario.nome, id, email } });
    } catch (e) {
      return res.json(null);
    }
  }
}

exports. default = new TokenController();
