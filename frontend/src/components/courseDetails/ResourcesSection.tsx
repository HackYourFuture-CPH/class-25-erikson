import React from 'react';
import { Lesson } from '../../data/data';

interface ResourcesSectionProps {
  lessons: Lesson[];
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ lessons }) => {
  return (
    <div className="resources">
      <h3>Resources</h3>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>
            <ul>
              {lesson.pdfs.map((pdf, pdfIndex) => (
                <li key={pdfIndex}>
                  <video controls>
                    <source src={lesson.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <a
                    href={pdf.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pdf.title} (PDF)
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesSection;
