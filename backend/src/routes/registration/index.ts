import {Router} from 'express';
import admin from 'firebase-admin';
import {register } from "../../controllers/registration";


const registration = Router();
registration.post('/signup',register);


export default registration;