import { supabase } from "@/integrations/supabase/client";

interface ParsedProduct {
  title: string;
  imageUrl: string;
  productUrl: string;
  price: number;
}

export const parseProductLine = (line: string): ParsedProduct | null => {
  // Format: (Product Name)[image_url]{product_url}-$price-
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

export const generateSKU = (title: string, index: number): string => {
  // Clean title and create SKU
  const cleaned = title
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  return `${cleaned}-${String(index).padStart(4, '0')}`;
};

export const extractCategory = (title: string): string => {
  const lower = title.toLowerCase();
  
  // Check for specific categories
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

export const extractBrand = (title: string): string => {
  const brands = [
    'Nike', 'Adidas', 'Balenciaga', 'Supreme', 'Off-White', 'Yeezy', 
    'Jordan', 'Gucci', 'Louis Vuitton', 'Dior', 'Prada', 'Versace',
    'Stone Island', 'CP Company', 'Moncler', 'Canada Goose', 'Arc\'teryx',
    'Stussy', 'Bape', 'Palace', 'Carhartt', 'Dickies', 'Corteiz',
    'Trapstar', 'Gallery Dept', 'Chrome Hearts', 'Essentials', 'Fear of God',
    'New Balance', 'Asics', 'Salomon', 'The North Face', 'Patagonia',
    'Mertra', 'Kroen', '99 Based'
  ];
  
  for (const brand of brands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  
  // Extract first word as potential brand
  const firstWord = title.split(' ')[0];
  return firstWord || 'Unknown';
};

export const processProductsFromFile = async (fileContent: string) => {
  const lines = fileContent.split('\n').filter(line => line.trim());
  const products = [];
  
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseProductLine(lines[i]);
    if (!parsed) continue;
    
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
  
  return products;
};

export const bulkInsertProducts = async (products: any[]) => {
  // Insert in batches of 100 to avoid timeout
  const batchSize = 100;
  const results = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from('products')
      .insert(batch)
      .select();
    
    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      throw error;
    }
    
    results.push(...(data || []));
    console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(products.length / batchSize)}`);
  }
  
  return results;
};
