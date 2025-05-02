import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      const {
        id, nome, email,
      } = novoUsuario;
      return res.json({
        id, nome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(usuarios);
    } catch (e) {
      return res.josn(null);
    }
  }

  async show(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      const { id, nome, email } = usuario;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.usuarioId);

      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      const usuarioEditado = await usuario.update(req.body);
      return res.json(usuarioEditado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.usuarioId);

      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }

      await usuario.destroy();
      return res.json(usuario);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UsuarioController();
