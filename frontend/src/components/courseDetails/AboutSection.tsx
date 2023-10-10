import React from 'react';

interface AboutSectionProps {
  description: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ description }) => {
  return (
    <div className="course-section">
      <h3>About</h3>
      <p>{description}</p>
    </div>
  );
};

export default AboutSection;
