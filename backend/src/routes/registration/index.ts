import {Router} from 'express';
import admin from 'firebase-admin';
import {register, getUserById } from "../../controllers/registration";


const registration = Router();
registration.post('/signup',register);
registration.post('/', getUserById);

export default registration;