import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import logo from "../logo.png";

//history is the value given by this function. predefined name.
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#380407" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div style={{ width: "100%" }}>
    <ul className="nav nav-tabs bg-info">
      <li>
        <img src={logo} style={{ height: "60px" }} alt="Logo" />
      </li>
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {isAutheticated() && isAutheticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            User Dashboard
          </Link>
        </li>
      )}
      {isAutheticated() && isAutheticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>
      )}
      {!isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-light"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Sign Out
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
