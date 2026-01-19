import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './../../components/context/StoreContext'
import axios from 'axios'
import { assets } from './../../assets/assets'

const MyOrders = () => {

  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await axios.post(
      url + '/api/order/userorders',
      {},
      { headers: { token } }
    )
    setData(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">My Orders</h2>

      {data.length === 0 ? (
        <p className="text-center text-muted">No orders found</p>
      ) : (
        <div className="row g-4">
          {data.map((order, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">

                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={assets.parcel_icon}
                      alt=""
                      style={{ width: '40px' }}
                      className="me-2"
                    />
                    <h6 className="mb-0">Order #{index + 1}</h6>
                  </div>

                  <p className="small text-muted">
                    {order.items.map((item, i) =>
                      i === order.items.length - 1
                        ? `${item.name} x ${item.quantity}`
                        : `${item.name} x ${item.quantity}, `
                    )}
                  </p>

                  <p className="mb-1">
                    <strong>Total:</strong> ${order.amount}.00
                  </p>

                  <p className="mb-1">
                    <strong>Items:</strong> {order.items.length}
                  </p>

                  <p className="mb-3">
                    <span
                      className="me-2"
                      style={{ color: order.status === 'Delivered' ? 'green' : 'orange' }}
                    >
                      ●
                    </span>
                    <strong>{order.status}</strong>
                  </p>

                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={fetchOrders}
                  >
                    Track Order
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
