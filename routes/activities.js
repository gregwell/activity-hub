import express from 'express';

const router = express.Router();

import { getActivities, createActivity, deleteActivity, getActivityById, patchActivity}  from '../controllers/activities.js';
import { auth } from '../middleware/auth.js';

//all routes in here are starting with /users
router.get('/', [auth, getActivities]);
router.post('/', createActivity);
router.delete('/:id', deleteActivity);
router.get('/:id', getActivityById); 
router.patch('/:id', patchActivity);

export default router;