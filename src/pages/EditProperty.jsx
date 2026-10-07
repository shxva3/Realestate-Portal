import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../services/api";

function EditProperty() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      city: "",
      type: "",
      purpose: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      image: "",
      description: "",
      furnished: ""
    });

  useEffect(() => {
    getProperty();
  }, []);

  async function getProperty() {

    const response =
      await api.get(
        `/properties/${id}`
      );

    setFormData(response.data);
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    await api.put(
      `/properties/${id}`,
      formData
    );

    navigate("/properties");
  }

  return (

    <div className="form-container">

      <h2>Edit Property</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
        />

        <input
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />

        <input
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />

        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          name="furnished"
          value={formData.furnished}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button className="submit-btn">
          Update Property
        </button>

      </form>

    </div>

  );
}

export default EditProperty;