import express from 'express';
import { signin, signup, getUsers, getUserActivities, deleteUser, getUserById, patchUser} from '../controllers/users.js'
import { auth, minimumPermissionLevelRequired } from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin); //no auth
router.post('/signup', signup); //no auth

router.get('/', [auth, minimumPermissionLevelRequired(2), getUsers]); //admin
router.get('/:id/activities', [auth, getUserActivities]); //any logged user

router.delete('/:id', [auth, minimumPermissionLevelRequired(2), deleteUser]); 
router.get('/:id', [auth, minimumPermissionLevelRequired(2), getUserById]);
router.patch('/:id', [auth, minimumPermissionLevelRequired(2), patchUser]);

export default router;