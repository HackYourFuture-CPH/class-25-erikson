import { Request, Response } from "express";
import db from "../../config/db-config";

const addLesson = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const { title, description, img } = req.body;
    
    const courseExists = await db('course').select(1).where({id: courseId}).first();
    
    if(!courseExists) {
      return res.status(404).json({ message: 'Course not found' })
    }

    await db('lesson').insert({
      title,
      description,
      img,
      course_id : courseId
    });

    res.status(201).json({ message: 'Lesson succesfully added!' })
  } catch (error) {
    res.status(500).json({ error: `Lesson creation failed: ${error}` })
  }
}

export {addLesson};