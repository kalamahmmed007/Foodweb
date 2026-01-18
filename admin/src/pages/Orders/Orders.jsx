import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching orders");
    }
  };

  // Change order status
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        toast.success("Status updated");
        await fetchAllOrders();
      } else {
        throw new Error(response.data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container my-4">
      <h3 className="mb-4">All Orders</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <tr key={idx}>
                  {/* Customer Name */}
                  <td>
                    {order.address?.firstName || "N/A"} {order.address?.lastName || ""}
                  </td>

                  {/* Items */}
                  <td>
                    {order.items?.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity}
                        {i !== order.items.length - 1 && ", "}
                      </span>
                    )) || "N/A"}
                  </td>

                  {/* Total Quantity */}
                  <td>{order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0}</td>

                  {/* Amount */}
                  <td>${order.amount || 0}</td>

                  {/* Status Dropdown */}
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status || "Food Processing"}
                      onChange={(e) => statusHandler(e, order._id)}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  {/* Address */}
                  <td>
                    {order.address
                      ? `${order.address.city || "N/A"}, ${order.address.state || ""}, ${
                          order.address.country || ""
                        }, ${order.address.zipcode || ""}`
                      : "N/A"}
                  </td>

                  {/* Phone */}
                  <td>{order.address?.phone || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
