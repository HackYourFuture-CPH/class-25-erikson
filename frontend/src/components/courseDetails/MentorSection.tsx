import React from 'react';
import { Mentor } from '../../data/data';

interface MentorSectionProps {
  mentor: Mentor;
}

const MentorSection: React.FC<MentorSectionProps> = ({ mentor }) => {
  return (
    <div className="mentor">
      <h3>Mentor</h3>
      <div className="mentor-details">
        <img src={mentor.image} alt={mentor.name} />
        <p>Name: {mentor.name}</p>
        <p>Role: {mentor.role}</p>
        <p>Social Networks:</p>
        <ul>
          {Object.entries(mentor.socialNetworks).map(([network, link]) => (
            <li key={network}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {network}
              </a>
            </li>
          ))}
        </ul>
        <p>Bio: {mentor.bio}</p>
        <p>Categories: {mentor.categories.join(', ')}</p>
      </div>
    </div>
  );
};

export default MentorSection;
