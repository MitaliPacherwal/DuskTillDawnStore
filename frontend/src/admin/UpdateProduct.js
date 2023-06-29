import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    // category,
    // loading,
    // error,
    updatedProduct,
    // getaRedirect,
    formData
  } = values;

  useEffect(() => {
console.log(values);
  }, [values]);

  const preload = productId => {
    getProduct(productId).then(data => {
      console.log(data);
      if (data !== undefined && data.error !== undefined) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories({
          ...values,
          name: data && data.name ? data.name : '',
          description: data && data.description ? data.description : '',
          price: data && data.price ? data.price : '',
          category: data && data.category && data.category.id ? data.category.id : '',
          stock: data && data.stock ? data.stock : '',
          formData: new FormData()
        });
      }
    });
  };

  const preloadCategories = (dataToSend) => {
    getCategories().then(data => {
      if (data !== undefined && data.error !== undefined) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ 
          ...dataToSend,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  //TODO: work on it
  const onSubmit = event => {
    event.preventDefault();

    console.log({
      name,
    description,
    price,
    stock,
    categories,
    // category,
    // loading,
    // error,
    updatedProduct,
    })



    setValues({ ...values, error: "", loading: true });
    let dataToSend = new FormData();
    dataToSend.append('name', name);
    dataToSend.append('description', description);
    dataToSend.append('price', price);
    dataToSend.append('stock', stock);
    // dataToSend.append('category', values.category);
    updateProduct(match.params.productId, user._id, token, dataToSend).then(
      data => {
        if (data !== undefined && data.error !== undefined) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            categories:"",
            formData:"",
            loading: false,
            updatedProduct: data && data.name ? data.name : '',
          });
        }
      }
    );
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      <h4>{updatedProduct} updated successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form encType="multipart/form-data">
      <span>Photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
         Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Updating product!"
      description="product updation area"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Back
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
