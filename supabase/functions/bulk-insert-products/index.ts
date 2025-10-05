import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  sku: string;
  title: string;
  store: string;
  category: string;
  price: number;
  image_url: string;
  product_url: string;
  tags: string[];
  description: string;
  in_stock: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { products } = await req.json();

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Invalid products array');
    }

    // Delete existing products
    await supabaseAdmin.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert new products
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(products)
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({ inserted: data?.length || 0 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
