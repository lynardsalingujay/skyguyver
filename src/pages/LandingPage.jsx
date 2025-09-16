import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage({
  handleEarlyAccess,
  email,
  setEmail,
  isLoading,
  signupMessage,
  scrollToSection,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-2xl font-bold text-white focus:outline-none"
                aria-label="Scroll to top"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SkyGuyver
                </span>
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* ...rest of your landing page sections (copy from App.jsx)... */}
      {/* Make sure to copy all sections and props as needed */}
    </div>
  );
}

export default LandingPage;
