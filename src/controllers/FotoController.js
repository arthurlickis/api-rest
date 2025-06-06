import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await Foto.create({ originalname, filename, aluno_id });
        const { id, url } = foto;
        return res.json({
          id, originalname, filename, url, aluno_id,
        });
      } catch (e) {
        res.status(400).json({
          errors: ['Aluno não foi encontrado'],
        });
      }
    });
  }
}

export default new FotoController();
