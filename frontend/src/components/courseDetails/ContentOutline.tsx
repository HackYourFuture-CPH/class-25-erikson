import React from 'react';
import { Lesson } from '../../data/data';
import Schedule from '../../assets/icons/schedule.svg';
import styles from './CourseComponents.module.css';

interface ContentOutlineProps {
  lessons: Lesson[];
}

const ContentOutline: React.FC<ContentOutlineProps> = ({ lessons }) => {
  return (
    <div className={styles.contentOutline}>
      <h2>Content Outline</h2>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>
            <div className={styles.lessonTitle}>{lesson.title}</div>
            <div className={styles.lessonDuration}>
              <p>
                <img src={Schedule} alt='schedule-icon' />
              </p>
              <p>{lesson.duration}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentOutline;
