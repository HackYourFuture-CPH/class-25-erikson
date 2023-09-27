import { Router } from "express";
import { addLesson } from "../../controllers/lesson";

const lesson = Router();

lesson.post('/:id/add_lesson', addLesson);

export default lesson;