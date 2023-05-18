import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { name,email,purchase}
  } = isAutheticated();

  const userLeftSide = () => {
    return (
      <div className="card bg-info">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group bg-info">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Your orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Purchase made:</span> {purchase}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base title="Welcome to User Profile" description="Your details"
    className="container bg-info p-4"
    >
    <div className="row">
      <div className="col-3">{userLeftSide()}</div>
      <div className="col-9">{userRightSide()}</div>
    </div>
  </Base>
  );
};

export default UserDashBoard;
