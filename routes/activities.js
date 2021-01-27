import express from 'express';

const router = express.Router();

import { getActivities, createActivity, deleteActivity, getActivityById, patchActivity}  from '../controllers/activities.js';
import { auth } from '../middleware/auth.js';

//all routes in here are starting with /users
router.get('/', getActivities);
router.post('/', [auth, createActivity]);
router.delete('/:id', [auth, deleteActivity]);
router.get('/:id', [auth, getActivityById]); 
router.patch('/:id', [auth, patchActivity]);

export default router;