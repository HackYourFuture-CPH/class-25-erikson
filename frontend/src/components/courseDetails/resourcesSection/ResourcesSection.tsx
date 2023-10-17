import React from 'react';
import { GetLesson } from '../../../types/component';
import playVideo from '../../../assets/icons/play-video.svg';
import grayDot from '../../../assets/icons/gray-dot.svg';
import timeCircle from '../../../assets/icons/time-circle.svg';
import dangerCircle from '../../../assets/icons/danger-circle.svg';
import styles from './ResourcesSection.module.css';

interface ResourcesSectionProps {
  lessons: GetLesson[];
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ lessons }) => {
  return (
    <>
      <h3>Resources</h3>
      <div className={styles.container}>
        {lessons.map((lesson) =>
          lesson.lesson_resources.map((resource, resourceIndex) => (
            <div className={styles.rowWrap} key={resourceIndex}>
              <img src={playVideo} className={styles.videoIcon} alt='video-icon' />
              <div className='icons-wrap'>
                <a href={resource.lesson_resources} target='_blank' rel='noreferrer'>
                  {resource.lesson_resources}
                </a>

                <div className={styles.resourceInfo}>
                  <img src={timeCircle} alt='time-icon' />
                  <p>8 min</p>
                  <img src={grayDot} className={styles.grayDot} alt='dot-icon' />
                  <img src={dangerCircle} className={styles.grayDot} alt='warning-icon' />
                  <p>24MB</p>
                </div>
              </div>
            </div>
          )),
        )}
      </div>
    </>
  );
};

export default ResourcesSection;
