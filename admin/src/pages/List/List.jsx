import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        throw new Error(response.data.message || "Failed to delete food");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Error removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container my-4">
      <h3 className="mb-4">All Foods List</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price ($)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFood(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No foods available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
