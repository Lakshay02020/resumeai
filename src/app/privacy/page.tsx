export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>At ResumeAI, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
        
        <h2 className="text-2xl mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as your name, email address, phone number, work experience, education, and other details necessary to generate your resume.</p>
        
        <h2 className="text-2xl mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect primarily to generate your personalized resume and to process your payments securely.</p>

        <h2 className="text-2xl mt-8 mb-4">3. Third-Party Services</h2>
        <p>We do not sell, trade, or rent your personal identification information to others. We use trusted third-party providers, such as Razorpay for payment processing, which have their own strict data privacy practices.</p>

        <h2 className="text-2xl mt-8 mb-4">4. Data Security</h2>
        <p>We adopt appropriate data collection, storage, processing practices, and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information.</p>
      </div>
    </div>
  );
}
