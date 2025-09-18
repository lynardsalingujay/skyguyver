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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

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
              <AdminDashboard user={user} setUser={setUser} />
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
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
              <section id="pricing" className="py-16 bg-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Plans & Pricing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Entry Plan */}
                    <div className="bg-slate-800 rounded-lg p-8 shadow text-white flex flex-col justify-between w-full min-w-[280px]">
                      <h3 className="text-2xl font-bold mb-2">ENTRY PLAN</h3>
                      <p className="text-xl font-semibold mb-4">
                        $39 USD / $66 NZD per month
                      </p>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          50 minutes of AI voice calls
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          NZ local phone number included
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Basic OpenAI voices (3 voice options)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Speech recognition & AI responses
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          24/7 automated answering
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Email support only
                        </li>
                      </ul>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium mt-auto">
                        Get Started
                      </button>
                    </div>
                    {/* Starter Plan */}
                    <div className="bg-slate-800 rounded-lg p-8 shadow text-white flex flex-col justify-between w-full min-w-[280px] border-2 border-blue-500">
                      <h3 className="text-2xl font-bold mb-2">
                        STARTER PLAN{" "}
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded ml-2">
                          Most Popular
                        </span>
                      </h3>
                      <p className="text-xl font-semibold mb-4">
                        $59 USD / $99 NZD per month
                      </p>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          100 minutes of AI voice calls
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          NZ local phone number included
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Basic OpenAI voices (6 voice options)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Speech recognition & AI responses
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          24/7 automated answering
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Basic analytics dashboard
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Live chat support
                        </li>
                      </ul>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium mt-auto">
                        Get Started
                      </button>
                    </div>
                    {/* Business Plan */}
                    <div className="bg-slate-700 rounded-lg p-8 shadow text-slate-400 flex flex-col justify-between w-full min-w-[280px] opacity-50 cursor-not-allowed">
                      <h3 className="text-2xl font-bold mb-2">
                        BUSINESS PLAN{" "}
                        <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded ml-2">
                          Coming Soon
                        </span>
                      </h3>
                      <p className="text-xl font-semibold mb-4">
                        $149 USD / $251 NZD per month
                      </p>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          300 minutes of AI voice calls
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          NZ local + toll-free number
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Premium OpenAI voices (HD quality)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Advanced conversation flows
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          CRM integrations
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Call recordings & transcripts
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400 text-lg">✦</span>
                          Priority support
                        </li>
                      </ul>
                      <button
                        className="bg-slate-600 text-white px-6 py-2 rounded font-medium mt-auto cursor-not-allowed"
                        disabled
                      >
                        Not Available
                      </button>
                    </div>
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
              <footer className="w-full bg-slate-900 text-slate-400 py-6 mt-12">
                <div className="max-w-7xl mx-auto flex justify-center space-x-8">
                  <a
                    href="/privacy-policy"
                    className="hover:text-white underline transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-of-service"
                    className="hover:text-white underline transition-colors"
                  >
                    Terms of Service
                  </a>
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
