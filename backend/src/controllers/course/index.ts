import { Request, Response } from 'express';
import db from '../../config/db-config';

const getAll = async(req: Request, res: Response) => {
  try {
    const courses = await db('course').select('title', 'description', 'category', 'img_course');
    courses.length === 0 
    ? res.status(404).json({message: 'No courses'})
    : res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: `Can't fetch courses: ${error}` });
  }
}

const getCourseById = async(req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const course = await db('course').select('title', 'description', 'category', 'img_course').where({'id' : courseId}).first();
    if (!course) {
      return res.status(404).json({ message: 'Selected course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: `Can't fetch course: ${error}` });
  }
}

const addNewCourse = async(req: Request, res: Response) => {
  try {
    const mentorId = req.params.id;

    const { 
      course_title, 
      course_description, 
      course_category,
      course_image,
      subscription_type,
      course_price,
      lesson_title, 
      lesson_image,
      lesson_description,
      lesson_resources, 
      sales_image,
      faq,
      faq_answer,
      key_learning,
      pricing_benefits
    } = req.body;

    await db.transaction(async (trx) => {
      const [ courseId ] = await trx('course')
        .insert({
          course_title, 
          course_description, 
          course_category, 
          course_image,
          subscription_type,
          course_price, 
          sales_image,
          key_learning,
          mentor: mentorId
        })
        .returning('id');
      
        const [lessonId] = await trx('lesson')
        .insert({
          lesson_title,
          lesson_image,
          lesson_description,
          course_id: courseId.id,
        })
        .returning('id');

        await trx('resource')
        .insert({
          lesson_resources,
          lesson_id: lessonId.id
        })
        
        await trx('faq')
        .insert({
          faq,
          faq_answer,
          course_id: courseId.id
        });

        await trx('benefit')
        .insert({
          pricing_benefits,
          course_id: courseId.id
        })

      await trx.commit();

      return res.status(201).json({ message: "The course has been created!" })
    })
  } catch (error) {
    res.status(500).json({ error: `Can't add course: ${error}` });    
  }
}

export {
  getAll,
  getCourseById, 
  addNewCourse
}