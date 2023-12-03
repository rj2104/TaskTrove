import React from 'react';
import './review.css'; // Import your CSS file

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4,
    serviceType: 'Web Development',
    reviewText: 'Great service! Im very satisfied with the web development work they did for my business.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 5,
    serviceType: 'Graphic Design',
    reviewText: 'Excellent graphic design services. They exceeded my expectations!',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    rating: 3,
    serviceType: 'SEO Optimization',
    reviewText: 'Good SEO work, but theres room for improvement.',
  },
];

function ReviewSection() {
  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="rating">Rating: {review.rating}</div>
            <div className="name">{review.name}</div>
            <div className="service-type">Service: {review.serviceType}</div>
            <p className="review-text">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
