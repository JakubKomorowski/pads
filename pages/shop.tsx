import React from "react";
import type { NextPage } from "next";
import axios from "axios";
import getStripe from "../lib/get-stripe";
import { useShoppingCart } from "use-shopping-cart";

const Shop: NextPage = () => {
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const redirectToCheckout = async () => {
    const {
      data: { id },
    } = await axios.post("/api/checkout_sessions", {
      items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe!.redirectToCheckout({ sessionId: id });
  };
  return (
    <div className="container mx-auto py-10 flex gap-4">
      <div className="w-[200px] h-[300px] bg-main">
        <button className="w-full bg-grey">buy</button>
      </div>
    </div>
  );
};

export default Shop;
