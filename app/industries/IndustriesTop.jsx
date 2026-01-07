"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Stethoscope,
  Cpu,
  Car,
  BatteryCharging,
  Shirt,
  FlaskConical,
} from "lucide-react";

const industries = [
  { key: "medical", title: "Medical", tagline: "Precision coatings for healthcare", image: "/industries/medical.jpg", icon: Stethoscope, subs: ["Blood Collection Tube Coating","Stents","Balloons","Diagnostic Devices","Medical Textiles / Mesh"] },
  { key: "electronics", title: "Electronics", tagline: "Advanced micro & PCB protection", image: "/industries/electronics.jpg", icon: Cpu, subs: ["PCB Coating","Semiconductor Coating","Sensor Protection","Micro Components"] },
  { key: "automotive", title: "Automotive", tagline: "Durable & efficient surface layers", image: "/industries/automotive.jpg", icon: Car, subs: ["Fuel Injectors","EV Battery Coating","Engine Components","Wear Protection"] },
  { key: "energy", title: "Energy", tagline: "High-performance energy solutions", image: "/industries/energy.jpg", icon: BatteryCharging, subs: ["Solar Cell Coating","Fuel Cells","Battery Electrodes","Energy Storage"] },
  { key: "textiles", title: "Textiles", tagline: "Functional & smart fabric coatings", image: "/industries/textile.jpg", icon: Shirt, subs: ["Water Repellent Fabrics","Medical Fabrics","Protective Coatings","Functional Textiles"] },
  { key: "research", title: "Research & R&D", tagline: "Innovation at nano scale", image: "/industries/nano.jpg", icon: FlaskConical, subs: ["Nanotechnology","Material Science","Lab Scale Coating","Prototype Development"] },
];

export default function IndustriesTop({ onSelect }) {
  const [openIndustry, setOpenIndustry] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenIndustry(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative py-14 px-4 rounded-3xl" style={{ background: "linear-gradient(135deg, #e5e7eb 0%, #f1f5f9 45%, #ffffff 100%)" }}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-green-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-48 -right-48 w-[480px] h-[480px] bg-emerald-300/20 rounded-full blur-3xl animate-float delay-3000" />
      </div>

      <div ref={wrapperRef} className="relative z-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-7">
        {industries.map((item) => {
          const isActive = openIndustry === item.key;
          const Icon = item.icon;

          return (
            <div key={item.key} className="relative">
              <div
                onClick={() => setOpenIndustry(isActive ? null : item.key)}
                className={`relative h-[215px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isActive ? "ring-2 ring-green-500 shadow-2xl" : "shadow-md hover:shadow-xl"}`}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover scale-105" />
                <div className="absolute inset-0 bg-white/65" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/25 to-black/10" />

                <div className="relative z-10 h-full px-4 pt-5 pb-4 flex flex-col justify-between text-gray-900">
                  <div className="text-center space-y-2">
                    <Icon size={26} className="mx-auto text-green-600" />
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="text-xs text-gray-700 leading-snug">{item.tagline}</p>
                  </div>

                  <div className="flex justify-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center bg-white/80 backdrop-blur border border-gray-300 transition-transform duration-300 ${isActive ? "rotate-180 text-green-600" : "text-gray-700"}`}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 z-50"
                  >
                    <div className="bg-white/95 backdrop-blur border border-green-500/40 rounded-xl shadow-lg overflow-hidden">
                      {item.subs.map((sub, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.03, backgroundColor: "rgba(16,185,129,0.1)" }}
                          transition={{ duration: 0.2 }}
                          onClick={() => { onSelect(item.key, sub); setOpenIndustry(null); }}
                          className="px-5 py-3 text-sm text-gray-700 cursor-pointer border-b last:border-b-0 rounded-lg"
                        >
                          {sub}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {0%,100%{transform:translateY(0);}50%{transform:translateY(28px);}}
        .animate-float {animation: float 14s ease-in-out infinite;}
        .delay-3000 {animation-delay: 3s;}
      `}</style>
    </section>
  );
}
