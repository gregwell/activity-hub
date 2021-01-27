import express from 'express';
import { signin, signup, getUsers, getUserActivities, deleteUser } from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.get('/', getUsers);
router.get('/:id/activities', getUserActivities); 

router.delete('/:id', deleteUser);

export default router;