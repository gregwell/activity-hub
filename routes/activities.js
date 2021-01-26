import express from 'express';

const router = express.Router();

import { getActivities, createActivity, deleteActivity, getActivityById, patchActivity}  from '../controllers/activities.js'

//all routes in here are starting with /users
router.get('/', getActivities);
router.post('/', createActivity);
router.delete('/:id', deleteActivity);
router.get('/:id', getActivityById); 
router.patch('/:id', patchActivity);

export default router;