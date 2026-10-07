import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addWishlist } from "../features/wishlistSlice";

function PropertyCard({
  property,
  onDelete,
}) {
  const dispatch = useDispatch();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const isAdmin =
    user?.role === "admin";

  function handleWishlist() {
    dispatch(addWishlist(property));
  }

  return (
    <div className="card">
      <img
        src={property.image}
        alt={property.title}
      />

      <h3>{property.title}</h3>

      <p>📍 {property.location}</p>

      <p>🏠 {property.type}</p>

      <p>🛏 {property.bedrooms} Bedrooms</p>

      <p>₹ {property.price}</p>

      <div className="card-actions">
        <Link
          className="view-btn"
          to={`/properties/${property.id}`}
        >
          View
        </Link>

        {isAdmin && (
          <>
            <Link
              className="edit-btn"
              to={`/edit-property/${property.id}`}
            >
              Edit
            </Link>

            <button
              className="delete-btn"
              onClick={() => onDelete(property.id)}
            >
              Delete
            </button>
          </>
        )}

        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          ❤️ Add To Wishlist
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;