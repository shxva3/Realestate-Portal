import { useEffect, useState } from "react";

import api from "../services/api";

import PropertyCard from "../components/PropertyCard";

import { Link } from "react-router-dom";

function Properties() {
  const [properties, setProperties] = useState([]);

  // Search and filter states
  const [search, setSearch] = useState("");

  const [type, setType] = useState("All");

  const [purpose, setPurpose] = useState("All");

  const [price, setPrice] = useState("All");

  const [sort, setSort] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin = user?.role === "admin";

  // Fetch properties
  useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    try {
      const response = await api.get("/properties");

      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete property
  async function deleteProperty(id) {
    try {
      await api.delete(`/properties/${id}`);

      setProperties((prevProperties) =>
        prevProperties.filter(
          (property) => property.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Search and combined filters
  const filteredProperties = properties.filter(
    (property) => {
      const searchMatch = property.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const typeMatch =
        type === "All" ||
        property.type === type;

      const purposeMatch =
        purpose === "All" ||
        property.purpose === purpose;

      const priceMatch =
        price === "All" ||
        (price === "under50" &&
          property.price < 5000000) ||
        (price === "50to100" &&
          property.price >= 5000000 &&
          property.price <= 10000000) ||
        (price === "above100" &&
          property.price > 10000000);

      return (
        searchMatch &&
        typeMatch &&
        purposeMatch &&
        priceMatch
      );
    }
  );

  // Sorting
  let finalProperties = [
    ...filteredProperties,
  ];

  if (sort === "high") {
    finalProperties.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "low") {
    finalProperties.sort(
      (a, b) => a.price - b.price
    );
  }

  return (
    <>
      <h1>Available Properties</h1>

      {/* Search and Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Property"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option>All</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
          <option>Farm House</option>
        </select>

        <select
          value={purpose}
          onChange={(e) =>
            setPurpose(e.target.value)
          }
        >
          <option>All</option>
          <option>Sale</option>
          <option>Rent</option>
        </select>

        <select
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        >
          <option>All</option>

          <option value="under50">
            Under ₹50 Lakhs
          </option>

          <option value="50to100">
            ₹50 Lakhs - ₹1 Crore
          </option>

          <option value="above100">
            Above ₹1 Crore
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort Price
          </option>

          <option value="high">
            High To Low
          </option>

          <option value="low">
            Low To High
          </option>
        </select>
      </div>

      {/* Add Property Button */}
      {isAdmin && (
        <Link
          className="add-btn"
          to="/add-property"
        >
          Add Property
        </Link>
      )}

      {/* Property Cards */}
      <div className="properties">
        {finalProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          finalProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={deleteProperty}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Properties;
