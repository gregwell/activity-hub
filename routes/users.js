import express from 'express';
import { signin, signup, getUsers, getUserActivities, deleteUser, getUserById, patchUser} from '../controllers/users.js'
import { auth, minimumPermissionLevelRequired, onlySameUserOrAdminCanDoThisAction } from '../middleware/auth.js';

const router = express.Router();
//1- user, 2-moderator, 3-admin permissions

router.post('/signin', signin); //no auth
router.post('/signup', signup); //no auth

router.get('/', [auth, minimumPermissionLevelRequired(2), getUsers]); //2 - moderator
router.get('/:id/activities', [auth, getUserActivities]); //any logged user

router.delete('/:id', [auth, onlySameUserOrAdminCanDoThisAction, deleteUser]); //only same user or admin
router.get('/:id', [auth, minimumPermissionLevelRequired(2), getUserById]); //moderator
router.patch('/:id', [auth, onlySameUserOrAdminCanDoThisAction, patchUser]); //only same user or admin

// to do:
// - prevent users from changing their own permissions levels
// - typscrypt implementation?
// - unit testing + error reporting
// - prevent admins from removing themselvess

export default router;