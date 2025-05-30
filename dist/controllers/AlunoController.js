"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async store(req, res) {
    try {
      const novoAluno = await _Aluno2.default.create(req.body);
      const {
        id, nome, sobrenome, email, idade, peso, altura,
      } = novoAluno;
      return res.json({
        id, nome, sobrenome, email, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({ attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']], include: { model: _Foto2.default, attributes: ['originalname', 'filename', 'url'] } });
      return res.json(alunos);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']], include: { model: _Foto2.default, attributes: ['originalname', 'filename', 'url'] } });
      return res.json(aluno);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encotrado'],
        });
      }
      const alunoEditado = await aluno.update(req.body);
      return res.json(alunoEditado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      await aluno.destroy();
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();

// index get, show get, create/store post, update put/patch, delete delete
