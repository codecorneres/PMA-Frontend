import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  let checkAuth = localStorage.getItem("token");

  if (!checkAuth) {
    return "";
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard">Home</Link>
      <Link to="/dashboard">CodeCorners PMA</Link>
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>
      {/* <Link to='/' >Logout</Link> */}
    </nav>
  );
};

export default Navbar;
