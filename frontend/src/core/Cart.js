import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className="text-dark">
        <h2>Products added to cart</h2>
        <div className="col-lg-2 col-4" 
        style={{display: "flex", marginTop: "100px"}}
        >
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
        </div>
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div className="text-dark">
        <h2>Checkout area</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6 text-dark">
        {loadAllProducts()} </div> 
        <div className="col-6">
        <StripeCheckout
        products ={products}
        setReload={setReload}/>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
