import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCartThunk } from '../redux/actions/cart';
import { makePriceCurrencyFormat } from '../HelperFunctions';
import CartQuantitySelector from './CartQuantitySelector';

class SingleCartItem extends Component {
  render() {
    const { cartItem, userId, orderId, removeFromCart, history } = this.props;
    const { id, name, productId, totalItemPrice, image } = cartItem;
    return (
      <tr>
        <td>
          <img
            src={image}
            className="cart-item-image"
            onClick={() => history.push(`/products/${productId}`)}
          />
        </td>
        <td>
          <Link to={`/products/${productId}`} className="col-sm-6">
            {name}
          </Link>
        </td>
        <td>
          <CartQuantitySelector userId={userId} cartItem={cartItem} />
        </td>
        <td>{makePriceCurrencyFormat(totalItemPrice)}</td>
        <td>
          <button
            type="button"
            className="remove-btn"
            onClick={() => {
              removeFromCart(userId, orderId, id);
            }}
          >
            X
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = ({ loggedInUser, userOrders }) => {
  const cartOrder = userOrders.find((order) => order.status === 'cart');
  return {
    userId: loggedInUser.id,
    orderId: cartOrder && cartOrder.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (userId, orderId, lineitemId) =>
      dispatch(removeFromCartThunk(userId, orderId, lineitemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCartItem);
