import React from 'react';
import { Lesson } from '../../data/data';

interface ContentOutlineProps {
  lessons: Lesson[];
}

const ContentOutline: React.FC<ContentOutlineProps> = ({ lessons }) => {
  return (
    <div className="content-outline">
      <h3>Content Outline</h3>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>
            <div className="lesson-title">{lesson.title}</div>
            <div className="lesson-duration">{lesson.duration}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentOutline;
