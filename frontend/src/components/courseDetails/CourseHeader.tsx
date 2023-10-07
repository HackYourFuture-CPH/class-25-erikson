import React from 'react';
import Schedule from '../../assets/icons/schedule.svg';
import styles from './CourseComponents.module.css';
import tags from '../courses/CourseList.module.css';

interface CourseHeaderProps {
  courseName: string;
  tag: string;
  formattedDuration: string;
  videoSource: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseName,
  tag,
  formattedDuration,
  videoSource,
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
              : tag === 'Finance'
              ? tags.finance
              : tag === 'Live Event' && tags.event
          }`}
        >
          {tag}
        </p>
        <h1>.</h1>
        <img src={Schedule} alt='schedule-icon' />
        <p>{formattedDuration}</p>
      </div>
      <video controls className={styles.video}>
        <source src={videoSource} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CourseHeader;
