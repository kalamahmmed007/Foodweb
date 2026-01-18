import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalItems: 0,
    totalAmount: 0,
    totalCustomers: 0,
    totalCategories: 0,
    recentOrders: [],
  });
  const [filter, setFilter] = useState("");

  // Fetch orders
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const orders = response.data.data || [];

        const totalOrders = orders.length;
        const totalItems = orders.reduce(
          (acc, order) => acc + (order.items?.reduce((iAcc, item) => iAcc + item.quantity, 0) || 0),
          0
        );
        const totalAmount = orders.reduce((acc, order) => acc + (order.amount || 0), 0);
        const totalCustomers = [...new Set(orders.map((o) => o.address?.email))].length || 0;
        const totalCategories = 6; // example, can fetch from API

        const recentOrders = orders.slice(-10).reverse();

        setStats({ totalOrders, totalItems, totalAmount, totalCustomers, totalCategories, recentOrders });
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Live update every 30s
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-warning text-dark";
      case "Out for delivery":
        return "bg-info text-dark";
      case "Delivered":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  // Revenue graph
  const revenueData = {
    labels: stats.recentOrders.map((_, idx) => `Order #${stats.totalOrders - idx}`),
    datasets: [
      {
        label: "Revenue ($)",
        data: stats.recentOrders.map((order) => order.amount || 0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  // Pie chart → Order status distribution
  const statusCounts = stats.recentOrders.reduce(
    (acc, order) => {
      acc[order.status || "Food Processing"] = (acc[order.status || "Food Processing"] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Order Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#FFC107", "#0DCAF0", "#198754", "#6C757D"],
      },
    ],
  };

  // Top selling items
  const itemCounts = {};
  stats.recentOrders.forEach((order) =>
    order.items?.forEach((item) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
    })
  );

  const barData = {
    labels: Object.keys(itemCounts),
    datasets: [
      {
        label: "Sold Quantity",
        data: Object.values(itemCounts),
        backgroundColor: "rgba(13,110,253,0.7)",
      },
    ],
  };

  // Filtered recent orders
  const filteredOrders = stats.recentOrders.filter(
    (order) =>
      order.address?.firstName?.toLowerCase().includes(filter.toLowerCase()) ||
      order.address?.lastName?.toLowerCase().includes(filter.toLowerCase()) ||
      order.items?.some((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="container my-4">
      <h3 className="mb-4">Pro Admin Dashboard</h3>


      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        {[
          { title: "Total Orders", icon: "bi-cart4", value: stats.totalOrders },
          { title: "Total Items", icon: "bi-box-seam", value: stats.totalItems },
          { title: "Total Amount", icon: "bi-currency-dollar", value: `$${stats.totalAmount}` },
          { title: "Total Customers", icon: "bi-people", value: stats.totalCustomers },
          { title: "Total Categories", icon: "bi-tags", value: stats.totalCategories },
        ].map((card, idx) => (
          <div className="col-md-2 mb-3" key={idx}>
            <div className="card shadow-sm border-0 text-center hover-shadow" style={{ backgroundColor: "#fff" }}>
              <div className="card-body">
                <i className={`bi ${card.icon} fs-1 mb-2`} style={{ color: "red" }}></i>
                <h6 className="card-title text-dark">{card.title}</h6>
                <p className="fs-4 mb-0 text-success">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Action Buttons */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Item
        </button>
        <button className="btn btn-success">
          <i className="bi bi-bag-check me-2"></i>View Orders
        </button>
        <button className="btn btn-warning text-dark">
          <i className="bi bi-people me-2"></i>View Users
        </button>
        <button className="btn btn-info text-dark">
          <i className="bi bi-bar-chart-line me-2"></i>Analytics
        </button>
      </div>

      {/* Charts */}
      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Revenue (Recent Orders)</h5>
            <Line data={revenueData} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Order Status Distribution</h5>
            <Pie data={pieData} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Top Selling Items</h5>
            <Bar data={barData} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search recent orders..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Recent Orders Table */}
      <div className="table-responsive shadow-sm rounded" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light sticky-top">
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Amount ($)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => (
                <tr key={idx}>
                  <td>
                    {order.address?.firstName || "N/A"} {order.address?.lastName || ""}
                  </td>
                  <td>
                    {order.items?.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity}
                        {i !== order.items.length - 1 && ", "}
                      </span>
                    )) || "N/A"}
                  </td>
                  <td>{order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0}</td>
                  <td>${order.amount || 0}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(order.status || "Food Processing")}`}>
                      {order.status || "Food Processing"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
