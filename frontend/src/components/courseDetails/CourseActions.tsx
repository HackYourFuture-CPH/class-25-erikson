import React, { useState } from 'react';
import styles from './CourseComponents.module.css';

interface CourseActionsProps {
  toggleAbout: () => void;
  toggleFAQs: () => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({
  toggleAbout,
  toggleFAQs,
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
        className={activeButton === 'faqs' ? styles.activeButton : ''}
        onClick={() => handleButtonClick('faqs', toggleFAQs)}
      >
        FAQs
      </button>
    </div>
  );
};

export default CourseActions;
