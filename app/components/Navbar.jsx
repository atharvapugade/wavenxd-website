import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="relative z-50 flex items-center justify-between px-10 py-4 shadow-sm border-b border-gray-400/80"
      style={{
        background:
          "linear-gradient(135deg, #eef2f7 0%, #f8fafc 50%, #ffffff 100%)",
      }}
    >
      <Image src="/logo.png" alt="WaveNxD" width={160} height={60} />

      <ul className="flex gap-8 text-sm font-medium items-center">
        <li><Link href="/">Home</Link></li>

        <li className="relative group">
          <div className="flex items-center gap-1 cursor-pointer">
            <span>Products</span>
            <ChevronDown
              size={16}
              className="transition-transform duration-300 group-hover:rotate-180"
            />
          </div>

          <div className="absolute left-0 top-full mt-3 w-48 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg py-2">
              <Link href="/products" className="block px-4 py-2 hover:bg-green-50 transition">
                Products
              </Link>
              <Link href="/accessories" className="block px-4 py-2 hover:bg-green-50 transition">
                Accessories
              </Link>
            </div>
          </div>
        </li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/industries">Industries</Link></li>
        <li><Link href="/about">About us</Link></li>
        <li><Link href="/contact">Contact us</Link></li>
      </ul>
    </nav>
  );
}
