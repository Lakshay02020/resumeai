"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  FileText, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award,
  Users
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary mb-8 bg-background/50 backdrop-blur-sm"
          >
            <Zap className="mr-2 h-4 w-4 fill-current text-amber-500" />
            <span className="text-secondary-foreground">The ultimate ATS-Resume Tool</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Beat the ATS. <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Land the Interview.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10 leading-relaxed"
          >
            Did you know 75% of resumes never reach a human? Our team of experts tailors your resume to beat Applicant Tracking Systems and showcase your true potential.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/apply">
              <Button size="xl" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/20 transition-all">
                Build My Resume Now
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-2 rounded-full backdrop-blur-sm">
              See How it Works
            </Button>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground w-full mb-4">Trusted by students at</p>
            <span className="text-xl font-bold font-serif italic text-muted-foreground">MIT Institute</span>
            <span className="text-xl font-bold font-serif italic text-muted-foreground">BITS Pilani</span>
            <span className="text-xl font-bold font-serif italic text-muted-foreground">IIT Delhi</span>
            <span className="text-xl font-bold font-serif italic text-muted-foreground">Stanford GSB</span>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div {...fadeInUp} className="space-y-4">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold">92%</h3>
              <p className="text-muted-foreground font-medium">Higher application success rate</p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-4">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold">10k+</h3>
              <p className="text-muted-foreground font-medium">Students joined waitlists</p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="space-y-4">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold">200+</h3>
              <p className="text-muted-foreground font-medium">Keywords optimized per resume</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">Revolutionize Your Career Search</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              We&apos;ve simplified the entire process so you can focus on mastering your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FileText,
                title: "1. Fill the Form",
                description: "Enter your background, skills, and the job description you're targeting. Our team gets straight to work."
              },
              {
                icon: Zap,
                title: "2. Pay & Generate",
                description: "Unlock premium expert-crafted resume generation with a small one-time payment. No hidden subscriptions."
              },
              {
                icon: ShieldCheck,
                title: "3. Get Your PDF",
                description: "Receive a professional, ATS-optimized resume directly in your inbox. Download and apply instantly."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-3xl border bg-card/50 hover:bg-card hover:shadow-xl transition-all"
              >
                <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6 transition-all group-hover:scale-110">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-medium">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-tight">Specifically Built to <br /> <span className="text-primary italic underline underline-offset-8">Defeat</span> the Robot Filters</h2>
              <div className="space-y-6">
                {[
                  "Keyword Matching Engine: Automatically inserts JD relevant keywords",
                  "Action-Oriented Language: Professionally optimized bullets",
                  "Strict ATS Formatting: Zero parsing errors for major ATS platforms",
                  "PDF & Source Generation: Clean, valid document structure",
                  "Quantified Achievements: Expertly crafted metrics and KPIs"
                ].map((feature, i) => (
                   <div key={i} className="flex items-start gap-3">
                     <div className="mt-1 p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                       <CheckCircle2 className="w-4 h-4" />
                     </div>
                     <p className="text-muted-foreground font-medium">{feature}</p>
                   </div>
                ))}
              </div>
              <Link href="/apply">
                <Button className="mt-10 h-14 px-8 rounded-full font-bold group">
                  Start Your Transformation <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="relative p-2 rounded-3xl border bg-background shadow-2xl overflow-hidden"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-indigo-50 to-primary/10 flex items-center justify-center p-8">
                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 border flex flex-col gap-4">
                   <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
                   <div className="h-8 w-2/3 bg-primary/20 rounded animate-pulse" />
                   <div className="h-px bg-border my-2" />
                   <div className="space-y-2">
                     <div className="h-3 w-full bg-muted rounded" />
                     <div className="h-3 w-full bg-muted rounded" />
                     <div className="h-3 w-4/5 bg-muted rounded" />
                   </div>
                   <div className="h-px bg-border my-2" />
                   <div className="flex gap-2">
                     <div className="h-6 w-16 bg-emerald-500/20 rounded-full" />
                     <div className="h-6 w-20 bg-amber-500/20 rounded-full" />
                     <div className="h-6 w-24 bg-primary/20 rounded-full" />
                   </div>
                   <div className="mt-auto h-24 w-full border-2 border-dashed rounded-xl border-primary/20 flex flex-col items-center justify-center text-primary/40 font-bold text-xs uppercase tracking-widest gap-2">
                     <Zap className="h-6 w-6" /> Resume Template Preview
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">Simple, Student-Friendly Pricing</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
              Invest once in your career. No recurring fees, no BS.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-primary via-indigo-600 to-primary-foreground shadow-2xl overflow-hidden"
            >
              <div className="bg-background rounded-[2.2rem] p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">Standard Pack</h3>
                    <p className="text-muted-foreground font-medium">Everything you need to land interviews</p>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded-full">Popular</div>
                </div>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-extrabold">₹199</span>
                  <span className="text-muted-foreground line-through decoration-amber-500">₹499</span>
                  <span className="text-muted-foreground font-medium">/ resume</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "Expert Written Resume",
                    "ATS-Matched Keyword Highlighting",
                    "Customized to Job Description",
                    "Professional PDF Export",
                    "Sent to Email Instantly",
                    "Unlimited Updates for 24 hours"
                  ].map((feat, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/apply">
                  <Button size="xl" className="w-full h-14 text-lg font-bold rounded-2xl group">
                    Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-center mt-4 text-xs text-muted-foreground font-medium">Secure Payment via Razorpay. No account required.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Common Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "Is this really ATS-friendly?", a: "Yes. We avoid tables, complex graphics, and use scan-able fonts that 99% of corporate Applicant Tracking Systems can read perfectly." },
              { q: "How long does it take?", a: "Once you submit the form and pay, our experts craft and email your resume within 24 hours." },
              { q: "Can I edit the resume later?", a: "You can re-generate with minor changes for 24 hours. After that, you'll need to submit a new application." },
              { q: "Do I need a LinkedIn profile?", a: "It's highly recommended but not mandatory. Our team can still build a great resume without it." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-background">
                <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                <p className="text-muted-foreground font-medium">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <motion.div 
          className="rounded-[3rem] px-8 py-16 text-center bg-primary text-primary-foreground relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
             <div className="absolute bottom-[-50%] left-[-10%] w-[500px] h-[500px] bg-indigo-900 rounded-full blur-[120px]" />
           </div>
           <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter relative z-10">Stop Applying Blindly.</h2>
           <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
             Join thousands of students getting calls from top-tier companies. Your dream job is waiting.
           </p>
           <Link href="/apply">
             <Button size="xl" variant="secondary" className="h-16 px-12 text-xl font-bold rounded-full relative z-10 transition-transform active:scale-95 shadow-2xl">
               Start Building Now
             </Button>
           </Link>
        </motion.div>
      </section>
    </div>
  );
}
