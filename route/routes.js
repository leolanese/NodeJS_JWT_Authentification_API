import express from 'express';
const router = express.Router();

import { registerUser, loginUser, account } from '../controller/controllers.js'
import protect from '../middleware/auth.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// private access route
router.route('/account').get(protect, account)

export default router;

