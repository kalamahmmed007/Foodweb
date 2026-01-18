import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h3 className="card-title mb-4">Add New Product</h3>
          <form onSubmit={onSubmitHandler}>
            {/* Image Upload */}
            <div className="mb-3 text-center">
              <label htmlFor="image" className="form-label d-block">
                Upload Image
              </label>
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload"
                className="img-thumbnail mb-2"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Type Here"
                required
              />
            </div>

            {/* Product Description */}
            <div className="mb-3">
              <label className="form-label">Product Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                rows="5"
                className="form-control"
                placeholder="Write content here"
                required
              ></textarea>
            </div>

            {/* Category & Price */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  className="form-select"
                >
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  className="form-control"
                  placeholder="$20"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
