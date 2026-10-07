import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );
  const wishlist = useSelector(
    (state) => state.wishlist
    );

  return (

    <nav>

      <Link to="/">
        Home
      </Link>

      {user && (
        <Link to="/properties">
          Properties
        </Link>
      )}

      {!user && (
        <>
          <Link to="/register">
            Signup
          </Link>

          <Link to="/login">
            Login
          </Link>
        </>
      )}

      {user && (
        <>
          <Link to="/logout">
            Logout
          </Link>
        </>
      )}
    {user && (
      <Link to="/wishlist">
        Wishlist ({wishlist.length})
      </Link>
    )}
    </nav>

  );
}

export default Navbar;