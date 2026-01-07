import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="relative text-gray-800 mt-20"
      style={{
        background: "linear-gradient(135deg, #f5f5f5 0%, #eaeaea 50%, #f9f9f9 100%)",
      }}
    >
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* COMPANY INFO */}
        <div>
          <Image src="/logo.png" alt="WaveNxD" width={160} height={60} />
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            WaveNxD Technologies delivers advanced ultrasonic spray solutions
            designed for precision, efficiency, and industrial excellence.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">Home</li>
            <li className="hover:text-gray-900 cursor-pointer">About Us</li>
            <li className="hover:text-gray-900 cursor-pointer">Products</li>
            <li className="hover:text-gray-900 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* INDUSTRIES */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Industries</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Medical</li>
            <li>Electronics</li>
            <li>Energy</li>
            <li>Textile</li>
            <li>Automotive</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📍 Kolhapur, Maharashtra, India</li>
            <li>📞 +91 98220 29999</li>
            <li>✉️ info@wavenxd.com</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div
        className="text-center py-4 text-sm border-t border-gray-300"
        style={{
          background: "linear-gradient(135deg, #eaeaea 0%, #f5f5f5 100%)",
        }}
      >
        © {new Date().getFullYear()} WaveNxD Technologies. All rights reserved.
      </div>
    </footer>
  );
}
