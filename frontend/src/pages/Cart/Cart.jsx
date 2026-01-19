import React, { useContext } from 'react'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Shopping Cart</h2>

      {/* Cart Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        style={{ width: '60px', borderRadius: '8px' }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{cartItems[item._id]}</td>
                    <td>${item.price * cartItems[item._id]}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item._id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="row mt-5">
        {/* Cart Total */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Cart Total</h4>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${getTotalCartAmount()}</span>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <span>${getTotalCartAmount() === 0 ? 0 : 2}</span>
              </div>
              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>
                  $
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 2}
                </span>
              </div>

              <button
                className="btn btn-success w-100 mt-4"
                onClick={() => navigate('/order')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Have a Promo Code?</h5>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter promo code"
                />
                <button className="btn btn-primary">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
