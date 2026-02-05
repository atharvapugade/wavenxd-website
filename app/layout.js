import "./globals.css";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";
import HeroStatements from "./components/HeroStatements";
import RetellInit from "./components/RetellInit";
import RetellVoiceFloat from "./components/RetellVoiceFloat";

export const metadata = {
  title: "WaveNxd Technologies",
  description: "Ultrasonic Spray Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        <Navbar />
        <HeroStatements />

        {children}

        <FloatingWidgets />
        <Footer />

        <div id="modal-root"></div>

        {/* ✅ Retell Chat Widget */}
        <RetellInit />

        {/* ✅ Voice AI Button */}
        <RetellVoiceFloat />
      </body>
    </html>
  );
}
