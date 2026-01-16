-- Create inquiries table to store form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE,
  location TEXT NOT NULL,
  vision TEXT NOT NULL,
  budget_range TEXT,
  referral_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting inquiries (anyone can submit a form)
CREATE POLICY "Anyone can submit an inquiry" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);