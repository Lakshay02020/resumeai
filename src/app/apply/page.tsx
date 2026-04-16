"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Cpu,
  Briefcase,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/TagInput";
import { useRouter } from "next/navigation";

// Form Steps
const STEPS = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Education", icon: GraduationCap },
  { id: 3, title: "Skills", icon: Cpu },
  { id: 4, title: "Experience", icon: Briefcase },
  { id: 5, title: "Review", icon: CheckCircle },
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    linkedin_url: "",
    target_role: "",
    degree: "",
    field_of_study: "",
    college: "",
    graduation_year: "",
    gpa: "",
    coursework: "",
    skills_technical: [] as string[],
    skills_tools: [] as string[],
    skills_soft: [] as string[],
    experience: "",
    projects: "",
    certifications: "",
    job_description: "",
  });

  const [score, setScore] = useState(0);

  useEffect(() => {
    const calculateScore = () => {
      let s = 0;
      if (formData.name) s += 10;
      if (formData.email) s += 10;
      if (formData.target_role) s += 10;
      if (formData.degree && formData.college) s += 10;
      if (formData.skills_technical.length >= 3) s += 15;
      if (formData.skills_tools.length >= 2) s += 10;
      if (formData.skills_soft.length >= 2) s += 5;
      if (formData.experience.length > 50) s += 15;
      if (formData.projects.length > 50) s += 10;
      if (formData.job_description.length > 100) s += 15; // Increased weight for JD
      setScore(Math.min(s, 100));
    };
    calculateScore();
  }, [formData]);

  const handleNext = () => {
    if (step < STEPS.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Save profile to DB and get ID
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, completeness_score: score }),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      const { profileId } = await response.json();

      // 2. Create Razorpay order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, amount: 19900 }) // ₹199
      });
      const orderData = await orderRes.json();

      // 3. Load script and open checkout
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) throw new Error("Razorpay SDK failed to load");

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ResumeAI",
        description: "Expert ATS Resume Creation",
        order_id: orderData.orderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (paymentResponse: any) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              profileId
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push(`/success?id=${profileId}`);
          } else {
            alert("Payment verification failed! Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#4f46e5" },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Submission/Payment failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Step Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Create Your Resume</h1>
            <div className="text-sm font-semibold px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Step {step} of 5
            </div>
          </div>

          <Progress value={(step / STEPS.length) * 100} className="h-3 rounded-full mb-8 bg-background border shadow-inner" />

          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isPast = step > s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div className={`p-3 rounded-2xl transition-all duration-300 ${isActive ? "bg-primary text-primary-foreground shadow-lg scale-110" :
                      isPast ? "bg-emerald-500/20 text-emerald-600" : "bg-background text-muted-foreground border"
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isActive ? "text-primary" : "text-muted-foreground"
                    }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-[2rem] border-none shadow-2xl shadow-primary/5 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    {step === 1 && "Personal Information"}
                    {step === 2 && "Educational Background"}
                    {step === 3 && "Professional Skills"}
                    {step === 4 && "Experience & Projects"}
                    {step === 5 && "Final Review"}
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    {step === 1 && "Tell us about yourself and your target role."}
                    {step === 2 && "Add your academic qualifications and coursework."}
                    {step === 3 && "List your technical, tool-based, and soft skills."}
                    {step === 4 && "Highlight your achievements and target job description."}
                    {step === 5 && "Review your data and see your ATS completeness score."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12">
                  {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                        <Input
                          id="name" name="name" placeholder="Lakshay Singla"
                          value={formData.name} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                        <Input
                          id="email" name="email" type="email" placeholder="hello@example.com"
                          value={formData.email} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                        <Input
                          id="phone" name="phone" placeholder="+91 98765 43210"
                          value={formData.phone} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="city" className="text-sm font-semibold">City / Location</Label>
                        <Input
                          id="city" name="city" placeholder="New Delhi, India"
                          value={formData.city} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="linkedin_url" className="text-sm font-semibold">LinkedIn URL</Label>
                        <Input
                          id="linkedin_url" name="linkedin_url" placeholder="linkedin.com/in/yourprofile"
                          value={formData.linkedin_url} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="target_role" className="text-sm font-semibold">Target Job Role</Label>
                        <Input
                          id="target_role" name="target_role" placeholder="Frontend Developer"
                          value={formData.target_role} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 focus-visible:ring-primary border-primary/20 bg-primary/5"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="degree" className="text-sm font-semibold">Highest Degree</Label>
                        <Input
                          id="degree" name="degree" placeholder="B.Tech"
                          value={formData.degree} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="field_of_study" className="text-sm font-semibold">Field of Study</Label>
                        <Input
                          id="field_of_study" name="field_of_study" placeholder="Computer Science"
                          value={formData.field_of_study} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="college" className="text-sm font-semibold">College / University</Label>
                        <Input
                          id="college" name="college" placeholder="IIT Delhi"
                          value={formData.college} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2 col-span-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="graduation_year" className="text-sm font-semibold">Graduation Year</Label>
                        <Input
                          id="graduation_year" name="graduation_year" placeholder="2024"
                          value={formData.graduation_year} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="gpa" className="text-sm font-semibold">GPA / Percentage</Label>
                        <Input
                          id="gpa" name="gpa" placeholder="8.5 / 10"
                          value={formData.gpa} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2"
                        />
                      </div>
                      <div className="space-y-3 col-span-1 md:col-span-2">
                        <Label htmlFor="coursework" className="text-sm font-semibold">Relevant Coursework</Label>
                        <Input
                          id="coursework" name="coursework" placeholder="Data Structures, Algorithms, Web Development"
                          value={formData.coursework} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-10">
                      <TagInput
                        label="Technical Skills"
                        tags={formData.skills_technical}
                        setTags={(tags: string[]) => setFormData(p => ({ ...p, skills_technical: tags }))}
                        placeholder="React, Node.js, Python..."
                      />
                      <TagInput
                        label="Tools & Platforms"
                        tags={formData.skills_tools}
                        setTags={(tags: string[]) => setFormData(p => ({ ...p, skills_tools: tags }))}
                        placeholder="VS Code, Docker, AWS..."
                      />
                      <TagInput
                        label="Soft Skills"
                        tags={formData.skills_soft}
                        setTags={(tags: string[]) => setFormData(p => ({ ...p, skills_soft: tags }))}
                        placeholder="Communication, Teamwork..."
                      />
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <Label htmlFor="experience" className="text-sm font-semibold">Work Experience / Internships</Label>
                        <Textarea
                          id="experience" name="experience" placeholder="Describe your roles and responsibilities... Be specific about achievements."
                          value={formData.experience} onChange={handleInputChange}
                          className="min-h-[120px] rounded-2xl border-2 p-6"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="projects" className="text-sm font-semibold">Projects</Label>
                        <Textarea
                          id="projects" name="projects" placeholder="Mention key projects, technologies used, and outcomes."
                          value={formData.projects} onChange={handleInputChange}
                          className="min-h-[120px] rounded-2xl border-2 p-6"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="certifications" className="text-sm font-semibold">Certifications</Label>
                        <Input
                          id="certifications" name="certifications" placeholder="AWS Certified Developer, Coursera, etc."
                          value={formData.certifications} onChange={handleInputChange}
                          className="h-14 rounded-xl border-2"
                        />
                      </div>
                      <div className="space-y-3 bg-primary/5 p-6 rounded-3xl border border-primary/20">
                        <Label htmlFor="job_description" className="text-sm font-bold flex items-center gap-2">
                          Target Job Description <Info className="w-4 h-4 text-primary" />
                        </Label>
                        <p className="text-xs text-muted-foreground mb-4">Paste the JD here. We use this to extract keywords and optimize your resume for higher ATS scores.</p>
                        <Textarea
                          id="job_description" name="job_description" placeholder="Paste the job description here..."
                          value={formData.job_description} onChange={handleInputChange}
                          className="min-h-[150px] rounded-2xl border-2 p-6 bg-background"
                        />
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-12">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative w-40 h-40 mb-6">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="80" cy="80" r="70"
                              stroke="currentColor" strokeWidth="8" fill="transparent"
                              className="text-muted/30"
                            />
                            <circle
                              cx="80" cy="80" r="70"
                              stroke="currentColor" strokeWidth="8" fill="transparent"
                              strokeDasharray={440}
                              strokeDashoffset={440 - (440 * score) / 100}
                              className={`${score > 80 ? "text-emerald-500" : score > 50 ? "text-amber-500" : "text-rose-500"} transition-all duration-1000 ease-out`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold">{score}%</span>
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">ATS Score</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {score > 80 ? "Excellent Profile!" : score > 50 ? "Looking Good!" : "Almost There!"}
                        </h3>
                        <p className="text-muted-foreground font-medium max-w-sm">
                          {score > 80 ? "Your profile is highly detailed. You're ready for optimal conversion." : "Adding more achievements and JD keywords will improve your chances."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl border bg-muted/20">
                          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-muted-foreground">Personal Details</h4>
                          <p className="font-bold">{formData.name}</p>
                          <p className="text-sm font-medium">{formData.email}</p>
                          <p className="text-sm text-primary font-bold mt-2">{formData.target_role}</p>
                        </div>
                        <div className="p-6 rounded-2xl border bg-muted/20">
                          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-muted-foreground">Experience Info</h4>
                          <p className="text-sm font-semibold line-clamp-3">{formData.experience || "No experience listed"}</p>
                        </div>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex gap-4">
                        <div className="p-2 h-fit bg-amber-500/20 rounded-lg text-amber-600">
                          <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <p className="font-bold text-amber-900">One final step!</p>
                          <p className="text-sm text-amber-800 font-medium">After clicking &apos;Pay &amp; Submit&apos;, our experts will begin crafting your resume. Payment is required one-time to receive the optimized PDF.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Navigation Buttons */}
                <div className="p-8 md:px-12 bg-muted/50 flex justify-between items-center border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1 || loading}
                    className="h-12 rounded-xl px-6 font-bold"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>

                  {step < 5 ? (
                    <Button
                      onClick={handleNext}
                      className="h-12 rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
                    >
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      loading={loading}
                      className="h-12 rounded-xl px-10 font-extrabold bg-gradient-to-r from-primary to-indigo-600 border-none shadow-xl hover:shadow-primary/40 text-white"
                    >
                      Pay & Submit Resume <Sparkles className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
