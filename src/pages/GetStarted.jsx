import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const BUSINESS_TYPES = [
  "Restaurant",
  "Auto Services",
  "Retail",
  "Healthcare",
  "Salon/Beauty",
  "Professional Services",
  "Real Estate",
  "Other",
];

function GetStarted() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const plan = params.get("plan") === "entry" ? "Entry Plan" : "Starter Plan";
  const price = plan === "Entry Plan" ? "$66 NZD/month" : "$99 NZD/month";

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: "",
    callsPerWeek: "",
    bestTimeToCall: "",
    aiRequests: "",
    agreeTerms: false,
    subscribeUpdates: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agreeTerms) return;
    // TODO: Send form data to backend or Supabase
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-slate-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Let's Get Started!{" "}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </h1>
        <p className="text-slate-300 mb-6 text-center">
          Tell us about your business so we can set up your perfect AI assistant
        </p>
        <div className="text-center mb-6">
          <span className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded font-semibold">
            {plan} - {price}
          </span>
        </div>
        {submitted ? (
          <div className="text-green-400 text-center font-semibold py-8 flex flex-col items-center">
            🎉 Thank you! We'll be in touch soon to set up your AI assistant.
            <Link
              to="/"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-slate-300 mb-1 font-medium"
              >
                Full Name{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="businessName"
                className="block text-slate-300 mb-1 font-medium"
              >
                Business Name{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-slate-300 mb-1 font-medium"
              >
                Email Address{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-slate-300 mb-1 font-medium"
              >
                Phone Number{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="businessType"
                className="block text-slate-300 mb-1 font-medium"
              >
                Type of Business{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <select
                id="businessType"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your business type</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="callsPerWeek"
                className="block text-slate-300 mb-1 font-medium"
              >
                Approximate Calls Per Week{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="callsPerWeek"
                name="callsPerWeek"
                value={form.callsPerWeek}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 20"
              />
            </div>
            <div>
              <label
                htmlFor="bestTimeToCall"
                className="block text-slate-300 mb-1 font-medium"
              >
                Best Time to Call You{" "}
                <span className="text-red-400" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="bestTimeToCall"
                name="bestTimeToCall"
                value={form.bestTimeToCall}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Weekdays after 2pm"
              />
            </div>
            <div>
              <label
                htmlFor="aiRequests"
                className="block text-slate-300 mb-1 font-medium"
              >
                Anything specific you'd like your AI assistant to handle?{" "}
                <span className="text-slate-400" aria-hidden="true">
                  (optional)
                </span>
              </label>
              <textarea
                id="aiRequests"
                name="aiRequests"
                value={form.aiRequests}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Let us know any special requests"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                required
                className="accent-blue-600"
                id="agreeTerms"
              />
              <label htmlFor="agreeTerms" className="text-slate-300 text-sm">
                I agree to the{" "}
                <a
                  href="/terms-of-service"
                  target="_blank"
                  className="underline text-blue-400"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="underline text-blue-400"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="subscribeUpdates"
                checked={form.subscribeUpdates}
                onChange={handleChange}
                className="accent-blue-600"
                id="subscribeUpdates"
              />
              <label
                htmlFor="subscribeUpdates"
                className="text-slate-300 text-sm"
              >
                I'd like to receive updates about AI voice technology and tips
                for my business
              </label>
            </div>
            <button
              type="submit"
              disabled={!form.agreeTerms}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold mt-4 transition-colors disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GetStarted;
