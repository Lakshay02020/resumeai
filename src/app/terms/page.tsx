export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="prose dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Welcome to ResumeAI! By using our website and services, you agree to comply with and be bound by the following terms and conditions.</p>
        
        <h2 className="text-2xl mt-8 mb-4">1. Use of Service</h2>
        <p>ResumeAI provides automated, AI-generated resume building services. You agree to provide accurate, current, and complete information during the resume generation process.</p>
        
        <h2 className="text-2xl mt-8 mb-4">2. Payment and Delivery</h2>
        <p>Our service requires a one-time payment for the generation of a resume. Upon successful payment, the resume will be generated and emailed to the provided email address within 24 hours.</p>

        <h2 className="text-2xl mt-8 mb-4">3. Prohibited Activities</h2>
        <p>You may not use our service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.</p>

        <h2 className="text-2xl mt-8 mb-4">4. Modifications to the Service and Prices</h2>
        <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.</p>

        <h2 className="text-2xl mt-8 mb-4">5. Contact Information</h2>
        <p>Questions about the Terms of Service should be sent to us via our Contact Us page.</p>
      </div>
    </div>
  );
}
