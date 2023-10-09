import React, { useState } from 'react';
import styles from './CourseComponents.module.css';

interface CourseActionsProps {
  toggleAbout: () => void;
  toggleReviews: () => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({
  toggleAbout,
  toggleReviews,
}) => {
  const [activeButton, setActiveButton] = useState<string>('');

  const handleButtonClick = (buttonName: string, toggleFunction: () => void) => {
    setActiveButton(buttonName);
    toggleFunction();
  };

  return (
    <div className={styles.courseActions}>
      <button
        className={activeButton === 'about' ? styles.activeButton : ''}
        onClick={() => handleButtonClick('about', toggleAbout)}
      >
        About
      </button>
      <button
        className={activeButton === 'reviews' ? styles.activeButton : ''}
        onClick={() => handleButtonClick('reviews', toggleReviews)}
      >
        Reviews
      </button>
    </div>
  );
};

export default CourseActions;
