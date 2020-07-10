import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makePriceCurrencyFormat, findUserNameById } from '../HelperFunctions';
import AddToCartButton from './addToCartButton';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const findStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; ++i) {
    stars.push(<StarIcon fontSize="large" />);
  }

  for (let i = stars.length; i < 5; ++i) {
    stars.push(<StarBorderIcon fontSize="large" />);
  }
  return stars;
};

const SingleProduct = (props) => {
  const { description, name, price, image } = props.product;
  const { reviews, users } = props;
  return (
    <div>
      <div className="product">
        <div className="product-image-container">
          <img src={image} className="product-image" />
        </div>
        <div className="product-info">
          <div className="product-name">{name}</div>
          <div className="product-price">{makePriceCurrencyFormat(price)}</div>
          <div className="product-description">{description}</div>
          <div className="product-button">
            <AddToCartButton product={props.product} />
          </div>
        </div>
      </div>
      <div className="product-reviews">
        <div className="product-reviews-header">Customer Reviews</div>
        {reviews.length ? (
          users.length &&
          reviews.map((review) => (
            <div className="product-reviews-container" key={review.id}>
              <div className="product-reviews-lead">
                <div className="product-reviews-title"> {review.title}</div>
                <div className="product-reviews-stars">
                  {findStars(review.rating).map((star) => star)}
                </div>
                <div className="product-reviews-author">
                  by {findUserNameById(review.userId, users)}
                </div>
              </div>
              <div className="product-reviews-content">{review.content}</div>
            </div>
          ))
        ) : (
          <div className="product-reviews-container">
            <div className="product-reviews-content">No reviews</div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (
  { products, reviews, users },
  { match: { params } }
) => {
  return {
    product:
      products.length && products.find((p) => p.id === Number(params.id)),
    reviews: reviews.filter((review) => review.productId === Number(params.id)),
    users,
  };
};

export default connect(mapStateToProps)(SingleProduct);
