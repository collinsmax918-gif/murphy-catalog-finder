// This script processes and inserts all products from murphy_items_bulk.txt
import { supabase } from '@/integrations/supabase/client';

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
  const brands = [
    'Nike', 'Adidas', 'Balenciaga', 'Supreme', 'Off-White', 'Yeezy', 
    'Jordan', 'Gucci', 'Louis Vuitton', 'Dior', 'Prada', 'Versace',
    'Stone Island', 'CP Company', 'Moncler', 'Canada Goose', 'Arcteryx',
    'Stussy', 'Bape', 'Palace', 'Carhartt', 'Dickies', 'Corteiz',
    'Trapstar', 'Gallery Dept', 'Chrome Hearts', 'Essentials', 'Fear of God',
    'New Balance', 'Asics', 'Salomon', 'The North Face', 'Patagonia',
    'Mertra', 'Kroen', '99 Based', 'CDG', 'Comme des Garcons'
  ];
  
  for (const brand of brands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  
  return title.split(' ')[0] || 'Unknown';
};

const extractCategory = (title: string): string => {
  const lower = title.toLowerCase();
  
  if (lower.includes('jean') || lower.includes('denim')) return 'Jeans';
  if (lower.includes('cargo') || lower.includes('pant') || lower.includes('trouser')) return 'Pants';
  if (lower.includes('hoodie') || lower.includes('sweatshirt')) return 'Hoodies';
  if (lower.includes('jacket') || lower.includes('coat')) return 'Outerwear';
  if (lower.includes('shirt') || lower.includes('tee') || lower.includes('top')) return 'Tops';
  if (lower.includes('short')) return 'Shorts';
  if (lower.includes('zip up')) return 'Hoodies';
  if (lower.includes('jumper') || lower.includes('sweater')) return 'Sweaters';
  if (lower.includes('tracksuit') || lower.includes('track')) return 'Activewear';
  if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('boot')) return 'Footwear';
  if (lower.includes('bag') || lower.includes('backpack')) return 'Accessories';
  if (lower.includes('hat') || lower.includes('cap') || lower.includes('beanie')) return 'Accessories';
  
  return 'Apparel';
};

const generateSKU = (title: string, index: number): string => {
  const cleaned = title
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  return `${cleaned}-${String(index).padStart(4, '0')}`;
};

// Read the file content (this needs to be run in a context where you can read files)
export const processAllProducts = async (fileContent: string) => {
  const lines = fileContent.split('\n').filter(line => line.trim());
  console.log(`Processing ${lines.length} product lines...`);
  
  const products = [];
  
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseProductLine(lines[i]);
    if (!parsed) {
      console.log(`Skipping line ${i + 1}: Could not parse`);
      continue;
    }
    
    const brand = extractBrand(parsed.title);
    const category = extractCategory(parsed.title);
    const sku = generateSKU(parsed.title, i + 1);
    
    products.push({
      sku,
      title: parsed.title,
      store: 'Itaobuy',
      category,
      price: parsed.price,
      image_url: parsed.imageUrl,
      product_url: parsed.productUrl,
      tags: [brand, category],
      description: `${brand} ${category} - ${parsed.title}`,
      in_stock: true
    });
  }
  
  console.log(`Parsed ${products.length} products successfully`);
  
  // Insert in batches
  const batchSize = 100;
  let inserted = 0;
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    console.log(`Inserting batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(products.length / batchSize)}...`);
    
    const { data, error } = await supabase
      .from('products')
      .insert(batch)
      .select();
    
    if (error) {
      console.error(`Error inserting batch:`, error);
      throw error;
    }
    
    inserted += data?.length || 0;
    console.log(`Successfully inserted ${inserted} products so far`);
  }
  
  return {
    total: lines.length,
    parsed: products.length,
    inserted
  };
};
