import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { useCart, useCartDispatch } from "@/context/CartContext";
import api from "@/api";

export default function Cart() {
  const [payAmount, setPayAmount] = useState();
  const cart = useCart();

  const dispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    dispatch({
      type: "add",
      payload: product,
    });
  };
  const handleDecreaseCart = (product) => {
    dispatch({
      type: "decrease",
      payload: product,
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].price * cart[i].quantity;
    }

    return totalPrice;
  };

  const handleChangePay = (event) => {
    const { value } = event.target;
    if (value === "" || /^\d+$/.test(value)) {
      setPayAmount(value);
    }
  };

  const handleCheckout = async () => {
    const products = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });
    try {
      const payload = {
        total_price: +getTotalPrice(),
        paid_amount: +payAmount,
        products,
      };
      await api.post("/transactions", payload);
      setPayAmount("");
      dispatch({
        type: "clear",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isDisableButton = () => {
    return !payAmount || +payAmount < +getTotalPrice() || cart.length === 0;
  };

  return (
    <div className={styles.cart}>
      <h3>CART</h3>
      <div className={styles["cart__cart-list"]}>
        {cart.map((cart, index) => {
          return (
            <div key={index} className={styles["cart-item"]}>
              <div className={styles["cart-item__image"]}>
                <Image
                  src={cart.img_product}
                  alt={cart.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles["cart-item__desc"]}>
                <p>{cart.name}</p>
                <p>{cart.price}</p>
              </div>
              <div className={styles["cart-item__action"]}>
                <button onClick={() => handleDecreaseCart(cart)}>-</button>
                <p>{cart.quantity}</p>
                <button onClick={() => handleAddToCart(cart)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["cart__checkout"]}>
        <div className={styles["cart__total-price"]}>
          <p>Total Harga</p>
          <p>{getTotalPrice()}</p>
        </div>
        <div className={styles["cart__pay"]}>
          <label>Bayar</label>
          <input
            placeholder="-"
            onChange={handleChangePay}
            type="number"
            value={payAmount}
          />
        </div>
        <button onClick={handleCheckout} disabled={isDisableButton()}>
          Checkout
        </button>
      </div>
    </div>
  );
}
