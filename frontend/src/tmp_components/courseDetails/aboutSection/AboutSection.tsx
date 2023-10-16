import React from 'react';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  description: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ description }) => {
  return (
    <div className='course-section'>
      <h3>About</h3>
      <p className={styles.descriptionWrap}>{description}</p>
    </div>
  );
};

export default AboutSection;
