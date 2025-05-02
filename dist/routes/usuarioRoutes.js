"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UsuarioController = require('../controllers/UsuarioController'); var _UsuarioController2 = _interopRequireDefault(_UsuarioController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// n deveria existir numa aplicação real
// router.get('/', UsuarioController.index); // lista usuarios
// router.get('/:id', UsuarioController.show); // lista usuario

router.post('/', _UsuarioController2.default.store);
router.put('/', _loginRequired2.default, _UsuarioController2.default.update);
router.delete('/', _loginRequired2.default, _UsuarioController2.default.delete);

exports. default = router;

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
