import { Request, Response } from "express";
import db from "../../config/db-config";

const addLesson = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const { title, description, img } = req.body;
    
    const courseExists = await db('course').select(1).where({id: courseId}).first();
    
    if(!courseExists) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await db('lesson').insert({
      title,
      description,
      img,
      course_id : courseId
    });

    res.status(201).json({ message: 'Lesson succesfully added!' });
  } catch (error) {
    res.status(500).json({ error: `Lesson creation failed: ${error}` })
  }
}

const addResource = async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const { url } = req.body; 

    const lessonExists = await db('lesson').select(1).where({ id: lessonId }).first();
    if(!lessonExists) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    await db('resource').insert({ url, lesson_id: lessonId });
    res.status(200).json({ message: 'Resource succesfully added!' });
  } catch (error) {
    res.status(500).json({ error: `Failed to add a resource: ${error}` });
  }
}

export {
  addLesson,
  addResource
};