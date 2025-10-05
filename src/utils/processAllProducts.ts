import { supabase } from '@/integrations/supabase/client';
import murphyData from '@/data/murphy_items_bulk.txt?raw';

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
    'Mertra', 'Kroen', '99 Based', 'CDG', 'Comme des Garcons', 'Ralph Lauren',
    'Tommy Hilfiger', 'Lacoste', 'Polo', 'Calvin Klein', 'Hugo Boss',
    'Ami', 'Maison Margiela', 'Rick Owens', 'Acne Studios', 'A.P.C'
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
  if (lower.includes('jacket') || lower.includes('coat') || lower.includes('puffer')) return 'Outerwear';
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
    .substring(0, 25);
  return `${cleaned}-${String(index).padStart(4, '0')}`;
};

export const processAllMurphyProducts = async () => {
  const lines = murphyData.split('\n').filter(line => line.trim());
  console.log(`Starting to process ${lines.length} product lines...`);
  
  const products = [];
  let skipped = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseProductLine(lines[i]);
    if (!parsed) {
      skipped++;
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
  
  console.log(`Parsed ${products.length} products successfully (skipped ${skipped})`);
  
  // Insert in batches of 50
  const batchSize = 50;
  let totalInserted = 0;
  const errors = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(products.length / batchSize);
    
    console.log(`Inserting batch ${batchNum}/${totalBatches}...`);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`Error in batch ${batchNum}:`, error);
        errors.push({ batch: batchNum, error });
      } else {
        totalInserted += data?.length || 0;
        console.log(`✓ Batch ${batchNum} inserted successfully`);
      }
    } catch (err) {
      console.error(`Exception in batch ${batchNum}:`, err);
      errors.push({ batch: batchNum, error: err });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return {
    total: lines.length,
    parsed: products.length,
    inserted: totalInserted,
    skipped,
    errors: errors.length,
    errorDetails: errors
  };
};
