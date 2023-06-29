import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data !== undefined && data.error !== undefined) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Welcome to Dusk-Till-Dawn" description="Your needs at your doorstep">
      <div className="row text-center">
        <h1 className="text-secondary">Trending Fashion Zone</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-3 mb-2 py-2" style={{minHeight:'150px'}}>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
