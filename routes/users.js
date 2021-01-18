import express from 'express';

const router = express.Router();

import { getUsers}  from '../controllers/users.js'

//all routes in here are starting with /users
router.get('/', getUsers);

export default router;