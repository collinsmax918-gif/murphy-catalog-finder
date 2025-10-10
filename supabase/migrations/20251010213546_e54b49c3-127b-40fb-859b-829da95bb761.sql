-- Add archived column to products table
ALTER TABLE public.products 
ADD COLUMN archived boolean NOT NULL DEFAULT false;

-- Archive all existing products
UPDATE public.products 
SET archived = true;

-- Drop the existing "Anyone can view products" policy
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;

-- Create new policy: non-admins can only see non-archived products, admins see all
CREATE POLICY "Users can view non-archived products, admins see all" 
ON public.products 
FOR SELECT 
USING (
  NOT archived OR has_role(auth.uid(), 'admin'::app_role)
);