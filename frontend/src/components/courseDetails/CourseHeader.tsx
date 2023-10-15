import React from 'react';
import Schedule from '../../assets/icons/schedule.svg';
import styles from './CourseComponents.module.css';
import tags from '../courses/CourseList.module.css';

interface CourseHeaderProps {
  courseName: string;
  tag: string;
  formattedDuration: string;
  link: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseName,
  tag,
  formattedDuration,
  link,
}) => {
  return (
    <div className={styles.courseHeader}>
      <h2>{courseName}</h2>
      <div className={styles.courseInfo}>
        <p
          className={`${
            tag === 'Professional'
              ? tags.professional
              : tag === 'Personal'
              ? tags.personal
              : tag === 'Finance' && tags.finance
          }`}
        >
          {tag}
        </p>
        <h1>.</h1>
        <img src={Schedule} alt='schedule-icon' />
        <p>{formattedDuration}</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={link} className={styles.photo} alt='course-img' />
      </div>
    </div>
  );
};

export default CourseHeader;