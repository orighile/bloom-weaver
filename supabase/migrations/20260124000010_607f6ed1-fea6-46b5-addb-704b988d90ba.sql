-- Fix overly permissive RLS policies for inquiries table
-- Restrict SELECT, UPDATE, DELETE to authenticated users only

DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
CREATE POLICY "Authenticated users can view inquiries" 
  ON public.inquiries 
  FOR SELECT 
  TO authenticated 
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;
CREATE POLICY "Authenticated users can update inquiries" 
  ON public.inquiries 
  FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.inquiries;
CREATE POLICY "Authenticated users can delete inquiries" 
  ON public.inquiries 
  FOR DELETE 
  TO authenticated 
  USING (true);