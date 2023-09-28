import { Request, Response } from 'express';
import db from '../../config/db-config';

const addFaq = async ( req: Request, res: Response ) => {
  try {
    const courseId = req.params.id;
    const { question_one, question_two } = req.body;

    const courseExists = await db('lesson').select(1).where({ course_id : courseId }).first();
    if(!courseExists) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await db('faq').insert({ 
      question_one, 
      question_two, 
      course_id : courseId 
    });
    res.status(201).json({ message : 'FAQ added succesfully!' });
  } catch (error) {
    res.status(500).json({ message: `Error posting FAQ: ${error}` });
  }
}

export {
  addFaq
}