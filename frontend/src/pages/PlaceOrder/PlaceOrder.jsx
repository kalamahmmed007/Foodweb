import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const placeOrder = async (e) => {
    e.preventDefault()

    let orderItems = []
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] })
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    const response = await axios.post(
      url + '/api/order/place',
      orderData,
      { headers: { token } }
    )

    if (response.data.success) {
      window.location.replace(response.data.session_url)
    } else {
      alert("Error")
    }
  }

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <div className="container my-5">
      <form onSubmit={placeOrder}>
        <div className="row g-4">

          {/* LEFT: DELIVERY INFO */}
          <div className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">Delivery Information</h4>

                <div className="row g-3">
                  <div className="col-md-6">
                    <input className="form-control" required name="firstName"
                      value={data.firstName} onChange={onChangeHandler}
                      placeholder="First Name" />
                  </div>

                  <div className="col-md-6">
                    <input className="form-control" required name="lastName"
                      value={data.lastName} onChange={onChangeHandler}
                      placeholder="Last Name" />
                  </div>

                  <div className="col-12">
                    <input className="form-control" type="email" required
                      name="email" value={data.email}
                      onChange={onChangeHandler}
                      placeholder="Email Address" />
                  </div>

                  <div className="col-12">
                    <input className="form-control" required name="street"
                      value={data.street} onChange={onChangeHandler}
                      placeholder="Street" />
                  </div>

                  <div className="col-md-6">
                    <input className="form-control" required name="city"
                      value={data.city} onChange={onChangeHandler}
                      placeholder="City" />
                  </div>

                  <div className="col-md-6">
                    <input className="form-control" required name="state"
                      value={data.state} onChange={onChangeHandler}
                      placeholder="State" />
                  </div>

                  <div className="col-md-6">
                    <input className="form-control" required name="zipcode"
                      value={data.zipcode} onChange={onChangeHandler}
                      placeholder="Zip Code" />
                  </div>

                  <div className="col-md-6">
                    <input className="form-control" required name="country"
                      value={data.country} onChange={onChangeHandler}
                      placeholder="Country" />
                  </div>

                  <div className="col-12">
                    <input className="form-control" required name="phone"
                      value={data.phone} onChange={onChangeHandler}
                      placeholder="Phone Number" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CART TOTAL */}
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-3">Order Summary</h4>

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
                    ${getTotalCartAmount() === 0
                      ? 0
                      : getTotalCartAmount() + 2}
                  </span>
                </div>

                <button type="submit"
                  className="btn btn-success w-100 mt-4">
                  PROCEED TO PAYMENT
                </button>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
