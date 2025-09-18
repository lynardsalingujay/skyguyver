function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-2 text-slate-400">Last Updated: [Date]</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our AI voice assistant services. We are
        committed to protecting your privacy and complying with the New Zealand
        Privacy Act 2020.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Information We Collect
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <span className="font-bold">Business Information:</span> Company name,
          contact details, business address, phone numbers and account
          credentials, service preferences and configuration data
        </li>
        <li>
          <span className="font-bold">Call Data:</span> Phone numbers calling
          your business line, call duration, time, and frequency, call
          recordings (if enabled), conversation transcripts for service
          improvement
        </li>
        <li>
          <span className="font-bold">Technical Data:</span> Usage statistics
          and service performance data, payment information (processed by
          third-party providers), support communications
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. How We Use Your Information
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide and maintain our AI voice services</li>
        <li>Process payments and manage subscriptions</li>
        <li>Improve our AI responses and service quality</li>
        <li>Provide customer support</li>
        <li>Comply with legal obligations</li>
        <li>Send service-related communications</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Information Sharing
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <span className="font-bold">Service Providers:</span> Vapi.ai (AI
          platform - US-based), OpenAI (AI models - US-based), Twilio (Phone
          services - US-based), Payment processors (Stripe, PayPal)
        </li>
        <li>
          <span className="font-bold">Legal Requirements:</span> When required
          by New Zealand law, to protect our rights or prevent fraud, with your
          explicit consent
        </li>
        <li>We never sell your personal information to third parties</li>
        <li>We never use your data for our own marketing</li>
        <li>We never share client call data with other clients</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Data Storage and Security
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Some data is processed by US-based service providers</li>
        <li>We implement reasonable security measures</li>
        <li>Call recordings are encrypted in transit and storage</li>
      </ul>
      <h3 className="text-lg font-semibold mt-4 mb-2">Data Retention:</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Account data: Retained while your account is active</li>
        <li>
          Call recordings: Deleted after 90 days (unless requested otherwise)
        </li>
        <li>Financial records: Kept for 7 years as required by NZ law</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Your Privacy Rights
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Access your personal information</li>
        <li>Request correction of inaccurate information</li>
        <li>
          Request deletion of your information (subject to legal requirements)
        </li>
        <li>Restrict processing of your information</li>
        <li>Object to processing for direct marketing</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Cookies and Tracking
      </h2>
      <p className="mb-4">
        Our website uses essential cookies for functionality. We do not use
        tracking cookies for advertising.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Third-Party Services
      </h2>
      <p className="mb-4">
        Our service relies on third-party providers who may have their own
        privacy policies:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Vapi.ai Privacy Policy</li>
        <li>OpenAI Privacy Policy</li>
        <li>Twilio Privacy Policy</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        9. International Data Transfers
      </h2>
      <p className="mb-4">
        Some of your data is processed by service providers based in the United
        States. These providers may not offer the same level of privacy
        protection as New Zealand law.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        10. Updates to Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this policy with reasonable notice. Continued use
        constitutes acceptance of changes.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">11. Contact Us</h2>
      <p>
        For privacy-related questions or to exercise your rights, contact us at:
        <br />
        Email:{" "}
        <span className="underline text-blue-400">
          privacy@yourbusiness.co.nz
        </span>
        <br />
        Address: [Your Business Address]
        <br />
        Phone: [Your Phone Number]
      </p>
    </div>
  );
}

export default PrivacyPolicy;
