-- Students who submit the form
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Personal
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  linkedin_url TEXT,
  target_role TEXT,

  -- Education
  degree TEXT,
  field_of_study TEXT,
  college TEXT,
  graduation_year INT,
  gpa TEXT,
  coursework TEXT,

  -- Skills (stored as arrays)
  skills_technical TEXT[],
  skills_tools TEXT[],
  skills_soft TEXT[],

  -- Experience
  experience TEXT,
  projects TEXT,
  certifications TEXT,

  -- Job Description
  job_description TEXT,

  -- Payment
  payment_status TEXT DEFAULT 'pending', -- pending | paid | failed
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount_paid INT, -- in paise (e.g. 19900 = ₹199)

  -- Resume generation
  resume_status TEXT DEFAULT 'not_generated', -- not_generated | generating | done | failed
  resume_url TEXT, -- Supabase storage URL
  resume_sent_at TIMESTAMPTZ,

  -- Profile completeness score (0-100)
  completeness_score INT DEFAULT 0
);

-- Admin table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL
);

-- Insert policy for storage (run these in SQL editor)
-- insert into storage.buckets (id, name, public) values ('resumes', 'resumes', true);
