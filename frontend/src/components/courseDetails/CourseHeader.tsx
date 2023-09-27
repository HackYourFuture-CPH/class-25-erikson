import React from 'react';

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
  videoSource
}) => {
  return (
    <div className="course-header">
      <h2>{courseName}</h2>
      <p>Tag: {tag}</p>
      <p>Total Time: {formattedDuration}</p>
      <video controls>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CourseHeader;
