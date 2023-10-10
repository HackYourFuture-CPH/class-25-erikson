import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../../data/data';

interface ReviewsSectionProps {
  reviews: Comment[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="course-section">
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <div className="review-header">
              <span className="user-name">{review.user_name} </span>
              <span className="timestamp">
                {formatTimestamp(review.timestamp)}
              </span>
            </div>
            <p className="comment">{review.comment}</p>
            <div className="review-actions">
              <button className="like-button">Like ({review.likes})</button>
              <button className="dislike-button">
                Dislike ({review.dislikes})
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

export default ReviewsSection;
