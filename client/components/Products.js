import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makePriceCurrencyFormat } from '../HelperFunctions';
import CategorySelector from './CategorySelector';

class Products extends Component {
  render() {
    const { products, history } = this.props;
    return (
      <div className="products-container">
        <div className="category-selector">
          <CategorySelector history={history} />
        </div>
        <div className="products">
          {products.map((product) => {
            const { id, name, price, image } = product;
            return (
              <Link
                to={`/products/${id}`}
                key={id}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="products-item">
                  <img className="products-item-image" src={image} alt={name} />
                  <div className="products-item-info">
                    <div className="products-item-name">{name}</div>
                    <div className="products-item-price">
                      {makePriceCurrencyFormat(price)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, categories }, { match: { params } }) => {
  const { categoryId } = params;
  return {
    products: categoryId
      ? products.filter((product) => product.categoryId === Number(categoryId))
      : products,
    categoryName:
      categoryId && categories[0]
        ? categories.find((c) => c.id === Number(categoryId)).name
        : 'All',
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
