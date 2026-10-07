import { useState } from "react";

import api from "../services/api";

import { useNavigate }
  from "react-router-dom";

function AddProperty() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      city: "",
      type: "",
      purpose: "Sale",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      image: "",
      description: "",
      furnished: ""
    });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    await api.post(
      "/properties",
      formData
    );

    navigate("/properties");
  }

  return (

    <div className="form-container">

      <h2>Add Property</h2>

      <form
        onSubmit={handleSubmit}
      >

        <input
          name="title"
          placeholder="Property Title"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Property Type"
          onChange={handleChange}
        />

        <select
          name="purpose"
          onChange={handleChange}
        >
          <option value="Sale">
            Sale
          </option>

          <option value="Rent">
            Rent
          </option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          onChange={handleChange}
        />

        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          onChange={handleChange}
        />

        <input
          type="number"
          name="area"
          placeholder="Area in sq.ft"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <input
          name="furnished"
          placeholder="Furnished Status"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <button className="submit-btn">
          Add Property
        </button>

      </form>

    </div>

  );
}

export default AddProperty;
