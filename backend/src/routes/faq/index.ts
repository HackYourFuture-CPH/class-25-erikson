import { Router } from 'express';
import { addFaq } from '../../controllers/faq';

const faq = Router();

faq.post('/:id/add_faq', addFaq); // id - lesson id;

export default faq;