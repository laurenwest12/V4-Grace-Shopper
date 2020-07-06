import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { findProductNameById } from '../HelperFunctions';

const Reviews = ({ user, reviews, products }) => {
  return (
    <div className="reviews-card">
      <h3>Reviews</h3>
      <h4>by {`${user.firstName} ${user.lastName}`}</h4>

      {reviews.map((review) => (
        <ul key={review.id}>
          <h4>
            <Link to={`/products/${review.productId}`}>
              {products.length &&
                findProductNameById(review.productId, products)}
            </Link>
          </h4>
          <StarIcon />
          <h5>{review.title}</h5>
          <li>{review.rating} / 5 stars</li>
          <li>{review.content}</li>
        </ul>
      ))}
    </div>
  );
};

export default Reviews;
