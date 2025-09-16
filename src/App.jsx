import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  useEffect(() => {
    document.title = "SkyGuyver";
  }, []);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleEarlyAccess = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setSignupMessage("");

    try {
      // Store email in Supabase for early access list
      const { error } = await supabase
        .from("early_access")
        .insert([{ email: email, created_at: new Date().toISOString() }]);

      if (error) throw error;

      setSignupMessage("🎉 Thanks! We'll be in touch soon with early access!");
      setEmail("");
    } catch (error) {
      setSignupMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 80; // height of your navbar
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          const navbarHeight = 80; // height of your navbar
          const y =
            el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Protect routes based on role
  const RequireAuth = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role)
      return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminDashboard user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth role="client">
              <ClientDashboard user={user} setUser={setUser} />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 scroll-smooth">
              {/* Navigation */}
              <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
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
                      <a
                        href="/login"
                        className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </nav>

              {/* Hero Section */}
              <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    AI Phone Assistants for
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {" "}
                      Modern Businesses
                    </span>
                  </h1>
                  <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
                    SkyGuyver transforms your customer service with AI-powered
                    phone assistants that never sleep. Handle calls, take
                    orders, and book appointments automatically.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <form
                      onSubmit={handleEarlyAccess}
                      className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email for early access"
                        className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        {isLoading ? "Joining..." : "Join Waitlist"}
                      </button>
                    </form>
                  </div>
                  {signupMessage && (
                    <p
                      className={`mt-4 text-sm ${
                        signupMessage.includes("🎉")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {signupMessage}
                    </p>
                  )}
                </div>
              </section>

              {/* Features Section */}
              <section
                id="features"
                className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
              >
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
                    Why Choose <span className="text-blue-400">SkyGuyver</span>?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: "📞",
                        title: "24/7 Call Handling",
                        description:
                          "Never miss a customer call. Our AI assistants work around the clock to take orders and answer queries.",
                      },
                      {
                        icon: "🤖",
                        title: "Smart AI Conversations",
                        description:
                          "Natural conversations powered by advanced AI that understands context and customer needs.",
                      },
                      {
                        icon: "💰",
                        title: "Cost Effective",
                        description:
                          "Save on staffing costs while providing better customer service. Scale without hiring.",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors"
                      >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-slate-300">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Pricing Section */}
              <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
                    Simple, Transparent{" "}
                    <span className="text-blue-400">Pricing</span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                      {
                        name: "Starter",
                        price: "$49",
                        description: "Perfect for small businesses",
                        features: [
                          "100 call minutes/month",
                          "1 phone number",
                          "Basic AI assistant",
                          "Email support",
                        ],
                      },
                      {
                        name: "Professional",
                        price: "$99",
                        description: "For growing businesses",
                        features: [
                          "500 call minutes/month",
                          "3 phone numbers",
                          "Advanced AI",
                          "Priority support",
                          "Custom greetings",
                        ],
                      },
                      {
                        name: "Enterprise",
                        price: "$249",
                        description: "For large organizations",
                        features: [
                          "2000 call minutes/month",
                          "Unlimited numbers",
                          "Custom AI training",
                          "24/7 support",
                          "API access",
                        ],
                      },
                    ].map((plan, index) => (
                      <div
                        key={index}
                        className={`bg-slate-800/50 p-8 rounded-2xl border ${
                          index === 1
                            ? "border-blue-500 scale-105"
                            : "border-slate-700"
                        } transition-all`}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {plan.name}
                        </h3>
                        <div className="text-3xl font-bold text-blue-400 mb-4">
                          {plan.price}
                          <span className="text-sm text-slate-400">/month</span>
                        </div>
                        <p className="text-slate-300 mb-6">
                          {plan.description}
                        </p>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center text-slate-300"
                            >
                              <span className="text-green-400 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                          Get Started
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Customer Service?
                  </h2>
                  <p className="text-xl text-slate-300 mb-10">
                    Join the waitlist and be among the first to experience the
                    future of business communication.
                  </p>
                  <form
                    onSubmit={handleEarlyAccess}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      {isLoading ? "Joining..." : "Join Waitlist"}
                    </button>
                  </form>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
                <div className="max-w-7xl mx-auto text-center">
                  <div className="text-2xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      SkyGuyver
                    </span>
                  </div>
                  <p className="text-slate-400 mb-8">
                    AI-powered phone assistants for the modern business era
                  </p>
                  <div className="flex justify-center space-x-6 mb-8">
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </div>
                  <p className="text-slate-500 text-sm">
                    © 2024 SkyGuyver. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
