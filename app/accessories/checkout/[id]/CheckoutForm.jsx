"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutForm({ product, cartItems = [], onSuccess }) {
  const router = useRouter();
  const isCartCheckout = cartItems.length > 0;

  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const shippingCharge = 100;
  const subtotal = isCartCheckout
    ? cartItems.reduce(
        (sum, item) =>
          sum + (item.price || 0) * (item.quantity || 1),
        0
      )
    : (product?.price || 0) * quantity;

  const total = subtotal + shippingCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pin" && value.length > 6) return;
    if (name === "phone" && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () =>
    formData.name.trim() &&
    formData.email.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.pin.trim().length === 6 &&
    formData.phone.trim().length === 10;

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!isFormValid()) return alert("Please fill all shipping details");

    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed");

    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "WaveNxD",
      description: isCartCheckout
        ? "Accessories Cart"
        : product?.title || "Product",
      order_id: order.id,
      handler: function () {
        alert("Payment Successful!");
        onSuccess?.();
        router.push("/accessories");
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#22c55e" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 sm:px-6 overflow-auto">
      <div className="bg-white w-full max-w-full sm:max-w-4xl rounded-xl shadow-xl p-4 sm:p-8 flex flex-col gap-6">

       {/* HEADER */}
<div className="relative flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
  {/* Logo - hidden on mobile */}
  <div className="hidden sm:flex flex-shrink-0">
    <Image
      src="/logo.png"
      alt="WaveNxD"
      width={140}
      height={70}
      className="object-contain"
    />
  </div>

  {/* Title - absolutely centered */}
  <h2 className="absolute left-1/2 -translate-x-1/2 text-sm sm:text-xl font-semibold text-green-600 text-center">
    Secure Checkout
  </h2>

  {/* Close Button */}
  <button
    onClick={() => router.back()}
    className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
    aria-label="Close"
  >
    &times;
  </button>
</div>




        {/* PRODUCT SUMMARY */}
        {!isCartCheckout && product && (
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border-b pb-4 sm:pb-6">
            <div className="w-full sm:w-28 h-28 relative rounded-lg overflow-hidden mx-auto sm:mx-0">
              <Image
                src={product.image || ""}
                alt={product.title || ""}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              <div className="flex justify-between items-center mt-3">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border px-3 py-2 rounded-lg text-sm w-24"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-green-600 font-semibold">₹{subtotal}</span>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {["name", "phone", "email", "city", "state", "pin"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}

          <input
            name="address"
            placeholder="ADDRESS"
            value={formData.address}
            onChange={handleChange}
            className="sm:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-base sm:text-lg font-semibold mt-4 sm:mt-6">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* TRUST MESSAGE */}
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          🔒 After successful payment, our team will contact you shortly to
          confirm your order and assist you further.
        </p>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={!isFormValid()}
          className={`w-full mt-4 sm:mt-6 py-3 rounded-lg text-white text-sm sm:text-lg transition ${
            isFormValid()
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Proceed To Pay
        </button>
      </div>
    </div>
  );
}
