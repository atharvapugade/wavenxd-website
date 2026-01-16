"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getCart, updateQuantity, removeFromCart } from "@/app/lib/cart";
import CheckoutForm from "../checkout/[id]/CheckoutForm";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  if (cart.length === 0) {
    return (
      <p className="p-16 text-center text-gray-600 text-lg">
        Your cart is empty
      </p>
    );
  }

  const shippingCharge = 50;
  const tax = 480;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCharge + tax;

  return (
    <>
      {/* PAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center sm:text-left">
          Your Cart ({cart.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT – CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover mx-auto sm:mx-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Unit Price: ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => {
                          updateQuantity(item._id, item.quantity - 1);
                          setCart(getCart());
                        }}
                        disabled={item.quantity === 1}
                        className="w-8 h-8 border rounded"
                      >
                        −
                      </button>

                      <span className="w-8 text-center">{item.quantity}</span>

                      <button
                        onClick={() => {
                          updateQuantity(item._id, item.quantity + 1);
                          setCart(getCart());
                        }}
                        className="w-8 h-8 border rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        setCart(getCart());
                      }}
                      className="text-red-500 text-sm mt-3"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="text-lg font-semibold mt-4 sm:mt-0">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6 lg:h-fit lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes (estimated)</span>
                <span>₹{tax}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping (estimated)</span>
                <span>₹{shippingCharge}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Grand Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => router.push("/accessories")}
              className="w-full border border-green-600 text-green-600 py-3 rounded-lg mt-2 hover:bg-green-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <CheckoutForm
          cartItems={cart}
          onSuccess={() => setShowCheckout(false)}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
