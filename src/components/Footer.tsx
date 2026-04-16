import Link from "next/link";
import { Sparkles, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 border-r border-border pr-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
              <div className="bg-primary p-1 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>ResumeAI</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Empowering students to land their dream jobs with expert ATS-optimized resumes.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 border rounded-full hover:bg-muted transition-colors">
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:ml-8">
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/apply" className="hover:text-primary transition-colors">Builder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Help Center & Terms</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/refunds" className="hover:text-primary transition-colors">Cancellation & Refunds</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground font-medium">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/refunds" className="hover:text-primary transition-colors">Refunds Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
