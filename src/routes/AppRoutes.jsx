import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyDetails
  from "../pages/PropertyDetails";
import AddProperty
  from "../pages/AddProperty";
import EditProperty
 from "../pages/EditProperty";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Wishlist from "../pages/Wishlist";

function AppRoutes() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to={user ? "/properties" : "/register"}
            replace
          />
        }
      />

      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <Properties />
          </ProtectedRoute>
        }
      />

      <Route
        path="/properties/:id"
        element={
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-property"
        element={
          <ProtectedRoute adminOnly>
            <AddProperty />
          </ProtectedRoute>
        }
      />     
      <Route
        path="/edit-property/:id"
        element={<ProtectedRoute adminOnly>
                  <EditProperty />
                  </ProtectedRoute>
                }
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<Logout />}
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default AppRoutes;
