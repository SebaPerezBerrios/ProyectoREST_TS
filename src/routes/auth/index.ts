import express from 'express';
import { createUser, createUserDataValidation, loginUser, loginUserDataValidation } from '../../controllers/auth';

const router = express.Router();
router.route('/login/signUp').post(createUserDataValidation, createUser);
router.route('/login/signIn').post(loginUserDataValidation, loginUser);

export default router;
