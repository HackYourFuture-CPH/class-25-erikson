import React from 'react';

interface CourseActionsProps {
  toggleAbout: () => void;
  toggleReviews: () => void;
  toggleResources: () => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({
  toggleAbout,
  toggleReviews,
  toggleResources,
}) => {
  return (
    <div className="course-actions">
      <button onClick={toggleAbout}>About</button>
      <button onClick={toggleReviews}>Reviews</button>
      <button onClick={toggleResources}>Resources</button>
    </div>
  );
};

export default CourseActions;
