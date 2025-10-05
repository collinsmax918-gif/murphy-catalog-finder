import { supabase } from '@/integrations/supabase/client';
import murphyData from '@/data/murphy_items_all.txt?raw';

const parseProductLine = (line: string) => {
  const regex = /\(([^)]+)\)\[([^\]]+)\]\{([^}]+)\}-\$([0-9.]+)-/;
  const match = line.match(regex);
  if (!match) return null;
  return {
    title: match[1],
    imageUrl: match[2],
    productUrl: match[3],
    price: parseFloat(match[4])
  };
};

const extractBrand = (title: string): string => {
  const brands = ['Nike', 'Adidas', 'Balenciaga', 'Supreme', 'Stussy', 'Kroen', 'Mertra', '99 Based'];
  for (const brand of brands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) return brand;
  }
  return title.split(' ')[0] || 'Unknown';
};

const extractCategory = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes('jean') || lower.includes('denim')) return 'Jeans';
  if (lower.includes('cargo') || lower.includes('pant')) return 'Pants';
  if (lower.includes('hoodie') || lower.includes('zip up')) return 'Hoodies';
  if (lower.includes('jumper') || lower.includes('sweater')) return 'Sweaters';
  return 'Apparel';
};

export const insertFirst100 = async () => {
  const lines = murphyData.split('\n').filter(line => line.trim()).slice(0, 100);
  const products = [];
  
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseProductLine(lines[i]);
    if (!parsed) continue;
    
    // Skip all Balenciaga products
    if (parsed.title.toLowerCase().includes('balenciaga')) continue;
    
    products.push({
      sku: `${parsed.title.toUpperCase().replace(/[^A-Z0-9]/g, '-').substring(0, 30)}-${String(i + 1).padStart(4, '0')}`,
      title: parsed.title,
      store: 'Itaobuy',
      category: extractCategory(parsed.title),
      price: parsed.price,
      image_url: parsed.imageUrl,
      product_url: parsed.productUrl,
      tags: [extractBrand(parsed.title), extractCategory(parsed.title)],
      description: `${extractBrand(parsed.title)} - ${parsed.title}`,
      in_stock: true
    });
  }
  
  // Call edge function to insert with admin privileges
  const { data, error } = await supabase.functions.invoke('bulk-insert-products', {
    body: { products }
  });

  if (error) {
    return { inserted: 0, error };
  }

  return { inserted: data.inserted || 0, error: null };
};
