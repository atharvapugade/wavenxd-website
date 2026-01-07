"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutForm({ product }) {
  const router = useRouter();
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
  const subtotal = product.price * quantity;
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
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!isFormValid()) {
      alert("Please fill all shipping details correctly");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed to load");

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
      name: "WaveNxd",
      description: product.title,
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful!");
        router.push("/accessories");
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#22c55e" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* PRODUCT SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Product</h2>
          <div className="flex gap-6">
            <div className="w-[150px] h-[150px] relative flex-shrink-0">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border px-2 py-1 rounded"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <span className="text-green-600 font-bold text-lg">
                  ₹{subtotal}
                </span>
              </div>

              <div className="mt-6 border-t pt-4 text-sm">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₹{shippingCharge}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SHIPPING FORM */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            {["name","email","address","city","state","pin","phone"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ))}

            <button
              onClick={handlePayment}
              disabled={!isFormValid()}
              className={`w-full py-3 rounded-full font-medium transition
                ${isFormValid() ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
