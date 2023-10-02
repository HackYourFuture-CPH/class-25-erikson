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
      category, 
      price, 
      price_type, 
      course_img, 
      sale_img,
      key_learning,
      lessons,
      faqs,
      benefits
    } = req.body;

    await db.transaction(async (trx) => {
      const [ courseId ] = await trx('course')
        .insert({
          course_title, 
          course_description, 
          category, 
          price,
          price_type,
          course_img, 
          sale_img,
          key_learning,
          mentor: mentorId
        })
        .returning('id');
      
        for (const lesson of lessons) {
          const [lessonId] = await trx('lesson')
            .insert({
              lesson_title: lesson.lesson_title,
              lesson_description: lesson.lesson_description,
              lesson_img: lesson.lesson_img,
              course_id: courseId.id,
            })
            .returning('id');

          for (const resource of lesson.resources) {
            await trx('resource')
            .insert({
              resource_url: resource.resource_url,
              lesson_id: lessonId.id
            })
          }
        }  

        for (const faq of faqs) {
          await trx('faq')
          .insert({
            faq: faq.faq,
            answer: faq.answer,
            course_id: courseId.id
          });
        }

        for(const benefit of benefits) {
          await trx('benefit')
          .insert({
            benefit_individual: benefit.benefit_individual,
            benefit_monthly: benefit.benefit_monthly,
            course_id: courseId.id
          })
        }

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