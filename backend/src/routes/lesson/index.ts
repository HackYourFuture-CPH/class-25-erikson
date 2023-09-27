import { Router } from "express";
import { addLesson, addResource } from "../../controllers/lesson";

const lesson = Router();

lesson.post('/:id/add_lesson', addLesson); //id - course id
lesson.post('/:id/add_resource', addResource) // id - lesson id

export default lesson;