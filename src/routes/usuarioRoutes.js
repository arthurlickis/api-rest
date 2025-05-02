import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// n deveria existir numa aplicação real
// router.get('/', UsuarioController.index); // lista usuarios
// router.get('/:id', UsuarioController.show); // lista usuario

router.post('/', UsuarioController.store);
router.put('/', loginRequired, UsuarioController.update);
router.delete('/', loginRequired, UsuarioController.delete);

export default router;

/*
  normalmente cada controller tem no máx 5 métodos

  index - listar usuarios -> GET
  store/create - cria novo usuário -> POST
  delete - apaga um usuário -> DELETE
  show - mostra um usuário -> GET
  update - atualiza um usuário -> PATCH ou PUT

  PATCH é usado para alterar somente um valor
  PUT pega o objt inteiro e substitui por outro objeto inteiro
*/
