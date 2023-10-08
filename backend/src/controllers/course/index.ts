import { Request, Response } from 'express';
import db from '../../config/db-config';
import { Course, FAQ, Lesson, Resource } from '../../interface/GetCourseById';

const getAll = async(req: Request, res: Response) => {
  try {
    const courses = await db('course')
    .select(
      'id',
      'course_title', 
      'course_category', 
      'course_image',
    )
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
    const course = await db('course')
    .select(
      'course.id',
      'course_title', 
      'course_description', 
      'course_category', 
      'course_image',
      'lesson_title',
      'lesson_description',
      'lesson_image',
      'lesson_resources',
      'faq.faq AS faq',
      'faq_answer'
      )
    .join('lesson', {'lesson.course_id': 'course.id'})
    .join('resource', {'lesson_id' : 'lesson.id'})
    .leftJoin('faq', { 'course.id': 'faq.course_id' })
    .where({'course.id': courseId});

    if (course.length === 0) {
      return res.status(404).json({ message: 'Selected course not found' });
    }

    const courseMap: Record<string, Course> = {};  //keys are strings
    course.forEach((row) => {
      let courseId = row.id;

      if (!courseMap[courseId]) {
        courseMap[courseId] = {
          course_title: row.course_title,
          course_description: row.course_description,
          course_category: row.course_category,
          course_image: row.course_image,
          lessons: [],
          faqs: []
        };
      }

    const lesson: Lesson = {
      lesson_title: row.lesson_title,
      lesson_description: row.lesson_description,
      lesson_image: row.lesson_image,
      lesson_resources: [
        {lesson_resources: row.lesson_resources } as Resource,
      ],
    };

    const existingLesson = courseMap[courseId].lessons.find(
      (l) => l.lesson_title === row.lesson_title
    );

    if (!existingLesson) {
      courseMap[courseId].lessons.push(lesson);
    } else {
      const resourceExists = existingLesson.lesson_resources.some(
        (resource) => resource.lesson_resources === row.lesson_resources
      );

      if (!resourceExists) {
        existingLesson.lesson_resources.push({ lesson_resources: row.lesson_resources });
      }
    }

      const faqEntry: FAQ = {
        faq: row.faq,
        faq_answer: row.faq_answer,
      };
      if (
        !courseMap[courseId].faqs.some(
          (existingFaq) =>
            existingFaq.faq === faqEntry.faq && existingFaq.faq_answer === faqEntry.faq_answer
        )
      ) {
        courseMap[courseId].faqs.push(faqEntry);
      }
    });
    res.status(200).json(courseMap[courseId]);
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
      course_price,
      subscription_type,
      course_image, 
      sales_image,
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
            course_category, 
            course_price,
            subscription_type,
            course_image, 
            sales_image,
            key_learning,
            mentor: mentorId
          })
          .returning('id');
  
          for (const lesson of lessons) {
            const [lessonId] = await trx('lesson')
              .insert({
                lesson_title: lesson.lesson_title,
                lesson_description: lesson.lesson_description,
                lesson_image: lesson.lesson_image,
                course_id: courseId.id,
              })
              .returning('id');
  
            for (const resource of lesson.resources) {
              await trx('resource')
              .insert({
                lesson_resources: resource.lesson_resources,
                lesson_id: lessonId.id
              })
            }
          }  
  
          for (const faq of faqs) {
            await trx('faq')
            .insert({
              faq: faq.faq,
              faq_answer: faq.faq_answer,
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