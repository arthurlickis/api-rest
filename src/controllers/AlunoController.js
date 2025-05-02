import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
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
      const alunos = await Aluno.findAll({ attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], order: [['id', 'DESC'], [Foto, 'id', 'DESC']], include: { model: Foto, attributes: ['originalname', 'filename', 'url'] } });
      return res.json(alunos);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], order: [['id', 'DESC'], [Foto, 'id', 'DESC']], include: { model: Foto, attributes: ['originalname', 'filename', 'url'] } });
      return res.json(aluno);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

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
      const aluno = await Aluno.findByPk(req.params.id);

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

export default new AlunoController();

// index get, show get, create/store post, update put/patch, delete delete
