import React from 'react';
import { Lesson } from '../../types/component';
import Schedule from '../../assets/icons/schedule.svg';
import styles from './CourseComponents.module.css';

interface ContentOutlineProps {
  lessons: {
    lesson_title: string; 
    lesson_description: string, 
    lesson_image: string, 
  }[];
}

const ContentOutline: React.FC<ContentOutlineProps> = ({ lessons }) => {
  return (
    <div className={styles.contentOutline}>
      <h2>Content Outline</h2>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>
            <div className={styles.lessonTitle}>{lesson.lesson_title}</div>
            <div className={styles.lessonTitle}>{lesson.lesson_title}</div>
            <div className={styles.lessonDuration}>
              <p>
                <img src={Schedule} alt='schedule-icon' />
              </p>
              <p>15 min</p>
              <p>15 min</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentOutline;
