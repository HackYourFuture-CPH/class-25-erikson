import React from 'react';
import { GetLesson } from '../../types/component';
import styles from './CourseComponents.module.css';
import lock from '../../assets/icons/icons8-lock.svg';

interface ContentOutlineProps {
  lessons: GetLesson[];
  isLesson?: boolean;
  selectedLesson?: number;
  setSelectedLesson?: (val: number) => void;
}

const ContentOutline: React.FC<ContentOutlineProps> = ({
  lessons,
  isLesson,
  selectedLesson,
  setSelectedLesson,
}) => {
  return (
    <div className={styles.contentOutline}>
      <h2>Content Outline</h2>
      <ul>
        {lessons.map((lesson, index) => (
          <li
            className={`${styles.lessonItem} ${selectedLesson === index ? styles.selected : ''}`}
            key={index}
            onClick={() => setSelectedLesson && setSelectedLesson(index)}
          >
            {!isLesson && (
              <div className={styles.lessonIcon}>
                <img src={lock} alt='add-icon' />
              </div>
            )}
            <div>
              <div className={styles.lessonTitle}>Lesson {index + 1}</div>
              <div className={styles.lessonSubTitle}>{lesson.lesson_title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentOutline;
