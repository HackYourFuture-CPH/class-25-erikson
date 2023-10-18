import { Request, Response } from 'express';
import db from '../../config/db-config';
import { Course, FAQ, Lesson, Resource } from '../../interface/GetCourseById';

const getAll = async(req: Request, res: Response) => {
  try {
    const courses = await db('course')
    .select(
      'course.id',
      'course_title',
      'course_category',
      'course_image',
      'course_price',
      'mentor',
      db.raw('COALESCE(student_courses.students, ARRAY[]::integer[]) AS students'),
      'lessons.lesson_count'
    )
    .leftJoin(
      db
        .select(
          'course_id',
          db.raw('ARRAY_AGG(DISTINCT student_id) AS students'))
        .from('student_course')
        .groupBy('course_id')
        .as ('student_courses'),
      { 'student_courses.course_id': 'course.id' }
    )
    .leftJoin(
      db
        .select('course_id')
        .count('id AS lesson_count')
        .from('lesson')
        .groupBy('course_id')
        .as('lessons'),
      { 'lessons.course_id': 'course.id' }
    )
    .groupBy(
      'course.id', 
      'course_title', 
      'course_category', 
      'course_image', 
      'lesson_count', 
      'student_courses.students'
    );

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
      const courseId = row.id;

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
      (l) => 
        l.lesson_title === row.lesson_title &&
        l.lesson_description === row.lesson_description &&
        l.lesson_image === row.lesson_image
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
      course_image, 
      sales_image,
      key_learning,
      lessons,
      faqs,
    } = req.body;

      await db.transaction(async (trx) => {
        const [ courseId ] = await trx('course')
          .insert({
            course_title, 
            course_description, 
            course_category, 
            course_price,
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

      await trx.commit();

      return res.status(201).json({ message: "The course has been created!" })
    })
  } catch (error) {
    res.status(500).json({ error: `Can't add course: ${error}` });    
  }
}

const startNewCourse = async(req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    const existingEnrollment = await db('student_course')
    .where({ 
      student_id: studentId, 
      course_id: courseId 
    })
    .first();

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Student is already enrolled in the course' });
    };

    await db('student_course').insert({
      student_id : studentId,
      course_id : courseId,
    });

    res.status(200).json({ message: 'Course started successfully' });
  } catch (error) {
    res.status(500).json({ error: `Can't start course: ${error}` });    
  }
}

const checkEnrollment = async(req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    const existingEnrollment = await db('student_course')
    .where({ 
      student_id: studentId, 
      course_id: courseId 
    })
    .first();

    existingEnrollment 
    ? res.status(200).json(existingEnrollment)
    : res.status(404).json({ error: "Enrollment information not found" })
  } catch (error) {
    res.status(500).json({ error: `Error fetching enrollment information: ${error}` });    
  }
}

export {
  getAll,
  getCourseById, 
  addNewCourse,
  startNewCourse,
  checkEnrollment
}