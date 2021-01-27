import express from 'express';

const router = express.Router();

import { getActivities, createActivity, deleteActivity, getActivityById, patchActivity}  from '../controllers/activities.js';
import { auth, onlySameUserOrAdminCanDoThisAction } from '../middleware/auth.js';

//all routes in here are starting with /users
router.get('/', [auth, getActivities]);  //any logged user
router.post('/', [auth, onlySameUserOrAdminCanDoThisAction, createActivity]); //same user or admin
router.delete('/:id', [auth,onlySameUserOrAdminCanDoThisAction, deleteActivity]);
router.get('/:id', [auth, getActivityById]); //any logged user
router.patch('/:id', [auth, onlySameUserOrAdminCanDoThisAction, patchActivity]); //same user or admin

export default router;