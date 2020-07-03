import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makePriceCurrencyFormat } from '../HelperFunctions';
import CategorySelector from './CategorySelector';
import AddToCartButton from './addToCartButton';

class Products extends Component {
  render() {
    const { products, history, categoryName } = this.props;
    console.log(history);
    return (
      <div className="products">
        <CategorySelector history={history} />

        {products.map((product) => {
          const { id, name, price, image } = product;
          return (
            <div className="products-item" key={id}>
              <img className="products-item-image" src={image} alt={name} />
              <div className="products-item-info">
                <div className="products-item-name">{name}</div>
                <div className="products-item-price">
                  {makePriceCurrencyFormat(price)}
                </div>
              </div>
            </div>
            // <li key={id} className="products-li">
            //   <img src={image} />
            //   <br />
            //   <Link to={`/products/${id}`}>{name}</Link>
            //   <br />
            //   {makePriceCurrencyFormat(price)}
            //   <br />
            //   <AddToCartButton product={product} />
            // </li>
          );
        })}
      </div>
      // <div className="product-list">
      //   <CategorySelector history={history} />

      //   <h4>{`${categoryName} Products`}</h4>

      //   <div className="container">
      //     <ul id="flex-container">
      //       {products.map((product) => {
      //         const { id, name, price, image } = product;
      //         return (
      //           <li key={id} className="products-li">
      //             <img src={image} />
      //             <br />
      //             <Link to={`/products/${id}`}>{name}</Link>
      //             <br />
      //             {makePriceCurrencyFormat(price)}
      //             <br />
      //             <AddToCartButton product={product} />
      //           </li>
      //         );
      //       })}
      //     </ul>
      //   </div>
      // </div>
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
