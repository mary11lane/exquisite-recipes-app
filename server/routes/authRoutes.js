import { Router } from 'express';
import { signup, login } from '../controllers/authControllers.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyUser);
router.post('/signup', signup);
router.post('/login', login);

export default router;
