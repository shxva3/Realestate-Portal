import { useDispatch, useSelector } from "react-redux";

import { removeWishlist } from "../features/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist
  );

  return (
    <div>
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div>
          <h2>No Properties In Wishlist</h2>

          <p>
            Add properties from the Properties page.
          </p>
        </div>
      ) : (
        <div className="properties">
          {wishlist.map((property) => (
            <div
              className="card"
              key={property.id}
            >
              <img
                src={property.image}
                alt={property.title}
              />

              <h3>{property.title}</h3>

              <p>📍 {property.location}</p>

              <p>₹ {property.price}</p>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch(
                    removeWishlist(property.id)
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;