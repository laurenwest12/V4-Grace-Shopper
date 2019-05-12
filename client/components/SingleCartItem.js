import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLineitemThunk, removeFromCartThunk } from '../redux/actions/cart'
import { makePriceCurrencyFormat } from '../HelperFunctions'

class SingleCartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantityChange: 1
    }
  }

  updateCartQuantity = (userId, orderId, id, item, quantityChange) => {
    const itemChanged = {
      id,
      orderId,
      productId: item.productId,
      quantity: Number(item.quantity) + Number(quantityChange)
    }
    return this.props.updateLineitem(userId, orderId, id, itemChanged)
  }

  handleQuantityChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { cartItem, userId, orderId, removeFromCart, products } = this.props
    const { updateCartQuantity, handleQuantityChange } = this
    const { quantityChange } = this.state

    const {
      id,
      productId,
      name,
      quantity,
      inventoryQuantity,
      totalItemPrice
    } = cartItem
    const disableIncreaseButton =
      Number(quantity) + Number(quantityChange) > inventoryQuantity
    const product = products.find(
      singleProduct => singleProduct.id === productId
    )
    return (
      <li key={id} className="list-group-item">
        <div className="row align-items-center">
          <div className="col-4 cart-img-container">
            <img src={product.image} className="single-cart-img" />
          </div>
          <div className="col-8">
            <ul>
              <Link to={`/products/${productId}`}>{name}</Link>{' '}
            </ul>
            <ul>
              {`Quantity: ${quantity}`}
              <button
                type="button"
                className="standard-btn"
                onClick={() =>
                  updateCartQuantity(
                    userId,
                    orderId,
                    id,
                    cartItem,
                    quantityChange
                  )
                }
                disabled={disableIncreaseButton}
              >
                +
              </button>
              <button
                type="button"
                className="standard-btn"
                onClick={() =>
                  updateCartQuantity(
                    userId,
                    orderId,
                    id,
                    cartItem,
                    -quantityChange
                  )
                }
                disabled={quantity - quantityChange < 0}
              >
                -
              </button>
              <label htmlFor="quantityChange">By: </label>
              <input
                type="text"
                id="quantityChange"
                name="quantityChange"
                value={this.state.quantityChange}
                onChange={handleQuantityChange}
              />
              {disableIncreaseButton && (
                <small>{`You can NOT increase your order of item by ${quantityChange}. Do NOT have that amount left.`}</small>
              )}
            </ul>
            <ul>{`Price: ${makePriceCurrencyFormat(totalItemPrice)}`}</ul>
            <button
              type="button"
              className="remove-btn remove-cart-btn"
              onClick={() => {
                removeFromCart(userId, orderId, id)
              }}
            >
              Remove item from cart
            </button>
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({ loggedInUser, userOrders, products }) => {
  const cartOrder = userOrders.find(order => order.status === 'cart')
  return {
    userId: loggedInUser.id,
    orderId: cartOrder && cartOrder.id,
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLineitem: (userId, orderId, lineitemId, lineitem) =>
      dispatch(updateLineitemThunk(userId, orderId, lineitemId, lineitem)),
    removeFromCart: (userId, orderId, lineitemId) =>
      dispatch(removeFromCartThunk(userId, orderId, lineitemId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCartItem)
