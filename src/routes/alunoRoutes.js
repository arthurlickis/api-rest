import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import AlunoController from '../controllers/AlunoController';

const router = new Router();

router.post('/', loginRequired, AlunoController.store);
router.get('/', AlunoController.index);
router.get('/:id', AlunoController.show);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;
