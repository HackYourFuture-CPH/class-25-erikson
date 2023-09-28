import { Router } from 'express';
import { addBenefit } from '../../controllers/benefit';

const benefits = Router();

benefits.post('/:id/add_benefit', addBenefit); // id - course id;')

export default benefits;