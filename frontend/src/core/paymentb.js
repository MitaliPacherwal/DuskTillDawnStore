import React, { useState, useEffect } from "react";
import { cartEmpty } from "./helper/cartHelper";
// import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      console.log("INFORMATION", info);
      if (info !== undefined && info.error !== undefined) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div className="text-dark">
        {info.clientToken !== null && products.length > 0 ? (
          <div className="text-dark">
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-primary" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we got a crash?");
          });

          setReload(!reload);
        })
        .catch(error => {
          setInfo({ error, loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div className="text-dark">
      <h3>Your bill is {getAmount()} ₹</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
