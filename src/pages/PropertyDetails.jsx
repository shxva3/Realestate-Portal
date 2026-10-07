import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../services/api";

function PropertyDetails() {

  const { id } = useParams();

  const [property, setProperty] =
    useState(null);

  useEffect(() => {
    getProperty();
  }, []);

  async function getProperty() {

    try {

      const response =
        await api.get(
          `/properties/${id}`
        );

      setProperty(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!property) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="details">

      <img
        src={property.image}
        alt={property.title}
      />

      <h1>{property.title}</h1>

      <p>
        {property.description}
      </p>

      <h3>Location</h3>
      <p>{property.location}</p>

      <h3>City</h3>
      <p>{property.city}</p>

      <h3>Property Type</h3>
      <p>{property.type}</p>

      <h3>Purpose</h3>
      <p>{property.purpose}</p>

      <h3>Price</h3>
      <p>₹ {property.price}</p>

      <h3>Bedrooms</h3>
      <p>{property.bedrooms}</p>

      <h3>Bathrooms</h3>
      <p>{property.bathrooms}</p>

      <h3>Area</h3>
      <p>{property.area} sq.ft</p>

      <h3>Furnished</h3>
      <p>{property.furnished}</p>

    </div>

  );
}

export default PropertyDetails;
