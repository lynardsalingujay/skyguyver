function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-2 text-slate-400">Last Updated: September 19, 2025</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Agreement to Terms</h2>
      <p className="mb-4">
        By accessing and using our AI voice assistant services, you agree to be
        bound by these Terms of Service. If you do not agree to these terms, you
        may not use our services.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Description of Service
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>AI voice assistant technology</li>
        <li>Phone number provision</li>
        <li>Call handling and response services</li>
        <li>Basic analytics and reporting</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Subscription Plans and Pricing
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Entry Plan: $66 NZD per month for 50 minutes</li>
        <li>Starter Plan: $99 NZD per month for 100 minutes</li>
        <li>Additional minutes charged at $0.25 NZD per minute</li>
        <li>Prices may include GST where applicable</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Payment Terms</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Monthly subscriptions are billed in advance</li>
        <li>Payment is due immediately upon signup</li>
        <li>Failed payments may result in service suspension</li>
        <li>No refunds for partial months of service</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Service Availability
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          We aim for high service availability but cannot guarantee 100% uptime
        </li>
        <li>
          Scheduled maintenance will be notified in advance where possible
        </li>
        <li>
          Service interruptions due to third-party providers (Twilio, OpenAI,
          etc.) are beyond our control
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Your Responsibilities
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide accurate business information for AI training</li>
        <li>Use the service only for lawful business purposes</li>
        <li>Not use the service for spam, harassment, or illegal activities</li>
        <li>Maintain the confidentiality of your account credentials</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Prohibited Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Emergency services (111/000 calls)</li>
        <li>Adult/sexual content services</li>
        <li>Illegal activities or services</li>
        <li>Harassment or threatening communications</li>
        <li>Competing services or reverse engineering</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Limitation of Liability
      </h2>
      <p className="mb-4">
        Our total liability to you is limited to the amount you paid in the 12
        months before the claim. We are not liable for:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Lost profits or business opportunities</li>
        <li>Indirect or consequential damages</li>
        <li>Service interruptions beyond our reasonable control</li>
        <li>Inaccurate AI responses or misunderstood customer calls</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">9. Data and Privacy</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>We collect and process data as described in our Privacy Policy</li>
        <li>You retain ownership of your business data</li>
        <li>
          We use third-party services that may process data outside New Zealand
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">10. Termination</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Either party may terminate with 30 days' written notice</li>
        <li>We may terminate immediately for breach of these terms</li>
        <li>Upon termination, access to the service ends immediately</li>
        <li>No refunds for prepaid periods</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">11. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms with 30 days' notice. Continued use
        constitutes acceptance of changes.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">12. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by New Zealand law. Any disputes will be
        resolved in New Zealand courts.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        13. Contact Information
      </h2>
      <p>
        For questions about these terms, contact us at:{" "}
        <span className="underline text-blue-400">legal@skyguyver.com</span>
      </p>
    </div>
  );
}

export default TermsOfService;
