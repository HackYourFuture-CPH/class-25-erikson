import { Request, Response } from 'express';
import db from '../../config/db-config';

const getAll = async(req: Request, res: Response) => {
  try {
    const courses = await db('course').select('title', 'description', 'category', 'thumbnail');
    courses.length === 0 
    ? res.status(404).json({message: 'No courses'})
    : res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: `Can't fetch courses: ${error}` });
  }
}

const addCourse = async(req: Request, res: Response) => {
  try {
    const mentorId = req.params.id;
    const { title, description, category, price, price_type, thumbnail } = req.body;
    await db('course').insert({
      title,
      description,
      category,
      price,
      price_type,
      thumbnail,
      mentor: mentorId,
    });

    res.status(201).json({ message: 'Course created!'});
  } catch (error) {
    res.status(500).json({ error: `Course creation failed: ${error}` });
  }
}

const getCourseById = async(req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const course = await db('course').select('title', 'description', 'category', 'thumbnail').where({'id' : courseId}).first();
    if (!course) {
      return res.status(404).json({ message: 'Selected course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: `Can't fetch course: ${error}` });
  }
}

export {
  addCourse,
  getAll,
  getCourseById
}