import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

class Home extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="home">
        <div className="home-image">
          <div className="home-image-content">
            <h1>We're experts in our field</h1>
            <Link to="/login">
              <button type="button" className="primary-btn">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        <div className="home-about">
          <Grid container>
            <Grid item xs={6}>
              <img
                src="https://images.unsplash.com/photo-1484759288640-783b22c95d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                alt="tractor"
                className="home-about-image"
              />
            </Grid>
            <Grid item xs={6} className="home-about-text">
              {' '}
              <h3>About Us</h3>
              <p>
                Founded in 1800, the Versioning Four family have been providing
                high quality farming products and more to the farming community
                for more than two centuries.
                <br />
                <br />
                The company began in Missouri and made a name for itself amongst
                local farmers through providing high end products in a timely
                manner. Customer satisfaction has always been our highest
                priority.
                <br />
                <br />
                As time has gone by and technology has improved we have branched
                out our business operations and we are now dedicated to
                providing quality products and service to people in the farming
                community throughout the US.
                <br />
                <br />
                We have the good stuff, please feel to browse our products.
              </p>
              <Link to="/products">
                <button type="button" className="secondary-btn">
                  Shop Now
                </button>
              </Link>
            </Grid>
          </Grid>
        </div>

        <div className="home-products">
          {products &&
            products.map((product) => (
              <div className="home-products-container" key={product.id}>
                <img
                  className="home-products-image"
                  src={product.image}
                  alt="product"
                />

                <div className="home-products-text">
                  {product.name}
                  <Link to={`/products/${product.id}`}>
                    <button type="button" className="primary-btn">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.filter((item, index) => index <= 2),
  };
};

export default connect(mapStateToProps)(Home);
