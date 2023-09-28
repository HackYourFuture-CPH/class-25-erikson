import { Router } from 'express';
import { addFaq } from '../../controllers/faq';

const faq = Router();

faq.post('/:id/add_faq', addFaq); // id - course id;

export default faq;