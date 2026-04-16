export default function RefundsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Cancellation and Refund Policy</h1>
      <div className="prose dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl mt-8 mb-4">1. Digital Nature of Products</h2>
        <p>Because ResumeAI generates custom digital goods (PDF Resumes) instantly upon processing, we generally do not offer refunds or cancellations once the generation process has started after a successful payment.</p>
        
        <h2 className="text-2xl mt-8 mb-4">2. Exceptions</h2>
        <p>Refunds may be evaluated on a case-by-case basis if:</p>
        <ul className="list-disc pl-5">
          <li>A technical error on our side prevented the delivery of the PDF resume to your email.</li>
          <li>You were double-charged due to a payment gateway error.</li>
        </ul>

        <h2 className="text-2xl mt-8 mb-4">3. Requesting Support</h2>
        <p>If you believe you have faced a technical issue or billing error, please reach out via our Contact Us page within 3 days of your transaction. If approved, refunds will be processed and credited back to the original method of payment within 5-7 working days.</p>
      </div>
    </div>
  );
}
