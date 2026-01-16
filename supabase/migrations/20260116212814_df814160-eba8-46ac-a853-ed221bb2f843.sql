-- Add SELECT policy for authenticated users (admins)
CREATE POLICY "Authenticated users can view inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (true);

-- Add UPDATE policy for authenticated users (admins)
CREATE POLICY "Authenticated users can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Add DELETE policy for authenticated users (admins)
CREATE POLICY "Authenticated users can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (true);