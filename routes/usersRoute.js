import express from 'express';
import { loginUserCtrl, registerUserCtrl, getUserProfile } from '../controllers/usersCtrl.js';
import { isLoggendIn } from '../middlewares/isLoggedIn.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggendIn, getUserProfile);


export default userRoutes;