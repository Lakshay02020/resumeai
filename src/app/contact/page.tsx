export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="p-8 rounded-2xl border bg-muted/20">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-6 text-muted-foreground">If you have any questions, concerns, or need support with your generated resume, please feel free to reach out to us. We typically respond within 24 hours.</p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-1">Email Support</h3>
            <p className="text-lg font-semibold">lakshay02singla@gmail.com</p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-1">Business Hours</h3>
            <p className="text-lg">Monday - Friday: 9AM - 6PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
