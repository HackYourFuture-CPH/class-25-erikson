import { Lesson } from '../../data/data';

interface LessonListProps {
  lessons: Lesson[];
}

function LessonList({ lessons }: LessonListProps) {
  return (
    <ul>
      {lessons.map((lesson, index) => (
        <li key={index}>
          <p>Lesson {index + 1}:</p>
          <p>Title: {lesson.title}</p>
          <p>Duration: {lesson.duration}</p>
        </li>
      ))}
    </ul>
  );
}

export default LessonList;
