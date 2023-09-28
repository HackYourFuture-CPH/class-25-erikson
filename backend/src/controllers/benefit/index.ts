import { Request, Response } from 'express';
import db from '../../config/db-config';

const addBenefit = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const { individual, monthly } = req.body;

    const courseExists = await db('lesson').select(1).where({ course_id : courseId }).first();
    if(!courseExists) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await db('benefit').insert({ 
      individual,
      monthly, 
      course_id : courseId 
    })

    res.status(201).json({ message: 'Benefits added!' });
  } catch (error) {
    res.status(500).json({ message: `Error posting benefits: ${error}` });
  }
}

export {
  addBenefit
}