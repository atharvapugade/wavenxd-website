"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutForm({ product, cartItems = [], onSuccess }) {
  const router = useRouter();
  const isCartCheckout = cartItems.length > 0;

  /* ---------------- FORM STATE ---------------- */
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

  /* ---------------- PRICING (MATCH CART PAGE) ---------------- */
  const SHIPPING_CHARGE = 50;
  const TAX = 480;

  const subtotal = isCartCheckout
    ? cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    : (product?.price || 0) * quantity;

  const total = subtotal + SHIPPING_CHARGE + TAX;

  /* ---------------- HANDLERS ---------------- */
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
    formData.pin.length === 6 &&
    formData.phone.length === 10;

  /* ---------------- RAZORPAY ---------------- */
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
        : product?.title || "Accessory",
      order_id: order.id,
      handler: () => {
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

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 overflow-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 sm:p-8">

        {/* HEADER */}
        <div className="relative flex justify-between items-center mb-6">
          <div className="hidden sm:block">
            <Image src="/logo.png" alt="WaveNxD" width={140} height={70} />
          </div>

          <h2 className="absolute left-1/2 -translate-x-1/2 text-green-600 font-semibold">
            Secure Checkout
          </h2>

          <button
            onClick={() => router.back()}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* PRODUCT SUMMARY (SINGLE PRODUCT ONLY) */}
        {!isCartCheckout && product && (
          <div className="flex gap-6 border-b pb-6 mb-6">
            <div className="w-28 h-28 relative">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>

              <div className="flex justify-between mt-4 items-center">
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

                <span className="font-semibold text-green-600">
                  ₹{subtotal}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "phone", "email", "city", "state", "pin"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
            />
          ))}

          <input
            name="address"
            placeholder="ADDRESS"
            value={formData.address}
            onChange={handleChange}
            className="sm:col-span-2 border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* TOTALS */}
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{TAX}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{SHIPPING_CHARGE}</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={!isFormValid()}
          className={`w-full mt-6 py-3 rounded-lg text-white ${
            isFormValid()
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Proceed To Pay
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          🔒 After successful payment, our team will contact you shortly.
        </p>
      </div>
    </div>
  );
}
