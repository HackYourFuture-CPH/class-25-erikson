import React, { useState } from 'react';
import styles from './LessonComponents.module.css';

interface LessonActionsProps {
  toggleAbout: () => void;
  toggleResources: () => void;
}

const LessonActions: React.FC<LessonActionsProps> = ({ toggleAbout, toggleResources }) => {
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
        className={activeButton === 'resource' ? styles.activeButton : ''}
        onClick={() => handleButtonClick('resource', toggleResources)}
      >
        Resources
      </button>
    </div>
  );
};

export default LessonActions;
