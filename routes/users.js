import express from 'express';

const router = express.Router();

import { getUsers, createUser, deleteUser, getUserById, patchUser}  from '../controllers/users.js'

//all routes in here are starting with /users
router.get('/', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById); 
router.patch('/:id', patchUser);

export default router;