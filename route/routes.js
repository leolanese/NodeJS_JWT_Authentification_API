import express from 'express';
const router = express.Router();

import { registerUser, loginUser, dashboard } from '../controller/controllers.js'
import protect from '../middleware/auth.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/dashboard').get(protect, dashboard)

export default router;

