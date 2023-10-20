import React from 'react';
import styles from './CourseComponents.module.css';
import tags from '../courses/CourseList.module.css';

interface CourseHeaderProps {
  courseName: string;
  tag: string;
  link: string;
  lessonTitle?: string;
  lessonSource?: string;
  lessonImage?: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseName,
  tag,
  link,
  lessonTitle,
  lessonSource,
  lessonImage,
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
      </div>
      {lessonSource && (
        <iframe
          title={lessonTitle}
          width='420'
          height='315'
          frameBorder='0'
          src={lessonSource}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
        // <video controls className={styles.video} src={`blob:${lessonSource}`} poster={lessonImage}>
        //   Sorry, your browser doesn't support embedded videos, but don't worry, you can
        // </video>
      )}

      {!lessonSource && (
        <div className={styles.imageContainer}>
          <img src={link} className={styles.photo} alt='course-img' />
        </div>
      )}
    </div>
  );
};

export default CourseHeader;
