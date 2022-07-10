import { Router } from 'express';
import { getRecipes, getRecipe } from '../controllers/apiControllers.js';

const router = Router();
router.get('/:recipes', getRecipes);
router.get('/recipes/:id', getRecipe);

export default router;
