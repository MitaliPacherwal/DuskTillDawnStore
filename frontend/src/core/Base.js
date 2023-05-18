import React from "react";
import Menu from "./Menu";
import {Link} from "react-router-dom";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-muted text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron text-dark text-center"
      style={{
        backgroundImage:'url("https://images.squarespace-cdn.com/content/v1/5a107461b078699b9ccb31a3/1668635707886-5LZN6UPGRM4JEV4IBDCE/dinh-ng-jYz3EGBhDpk-unsplash-min.jpg?format=1500w")',
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'center',
        width: '100vw'
      }}>
        <h2 className="display-4 font-weight-bold text-uppercase text-dark">{title}</h2>
        <p className="my-8 font-italic text-success text-dark ">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-muted position-relative mt-auto">
      <div className="container-fluid bg-primary text-white text-center py-0">
        <h4>If you got any questions, feel free to reach out!</h4>
        <Link className="nav-link" to="/contactus">
        <button className="btn btn-dark btn-lg">Contact Us</button>
        </Link>
      </div>
      <div className="container">
        <span className="text-danger">
          An E-Commerce <span className="text-dark">"DUSK_TILL_DAWN"</span> Clothing Store.
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
