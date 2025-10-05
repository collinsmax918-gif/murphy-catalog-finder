import { Product } from "@/types/product";

/**
 * Parse Murphy's product format:
 * (Title)[image_url]{product_url}-$price-
 */
export function parseMurphyProducts(text: string): Product[] {
  const lines = text.split('\n').filter(line => line.trim());
  const products: Product[] = [];
  const seenTitles = new Set<string>();
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Remove line number prefix if present (e.g., "1: ")
    const cleanLine = line.replace(/^\d+:\s*/, '');
    
    // Parse format: (Title)[image_url]{product_url}-$price-
    const match = cleanLine.match(/\(([^)]+)\)\[([^\]]+)\]\{([^}]+)\}-\$([0-9.]+)-/);
    
    if (match) {
      const [, title, imageUrl, productUrl, priceStr] = match;
      const normalizedTitle = title.trim();
      const cleanImageUrl = imageUrl.trim();
      
      // Skip products without valid image URLs
      if (!cleanImageUrl || cleanImageUrl === '') {
        continue;
      }
      
      // Skip duplicates - keep only the first occurrence of each title
      if (seenTitles.has(normalizedTitle)) {
        continue;
      }
      
      seenTitles.add(normalizedTitle);
      const price = parseFloat(priceStr);
      
      const product: Product = {
        sku: `MURPHY-${(i + 1).toString().padStart(4, '0')}`,
        title: normalizedTitle,
        store: 'ITaoBuy',
        category: detectCategory(normalizedTitle),
        price: price,
        image_url: cleanImageUrl,
        product_url: productUrl.trim(),
        tags: generateTags(normalizedTitle),
        description: generateDescription(normalizedTitle),
        inStock: true
      };
      
      products.push(product);
    }
  }
  
  return products;
}

function detectCategory(title: string): string {
  const lower = title.toLowerCase();
  
  if (lower.includes('hoodie') || lower.includes('jumper') || lower.includes('zip up') || lower.includes('knit')) {
    return 'Hoodies & Sweatshirts';
  }
  if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('air max') || 
      lower.includes('jordan') || lower.includes('dunk') || lower.includes('yeezy') ||
      lower.includes('nike') || lower.includes('adidas') || lower.includes('asics')) {
    return 'Shoes';
  }
  if (lower.includes('jean') || lower.includes('cargo') || lower.includes('pant') || lower.includes('trouser')) {
    return 'Pants';
  }
  if (lower.includes('shirt') || lower.includes('tee') || lower.includes('polo')) {
    return 'Shirts';
  }
  if (lower.includes('jacket') || lower.includes('coat') || lower.includes('puffer')) {
    return 'Jackets';
  }
  if (lower.includes('short')) {
    return 'Shorts';
  }
  if (lower.includes('bag') || lower.includes('backpack')) {
    return 'Bags';
  }
  if (lower.includes('hat') || lower.includes('cap') || lower.includes('beanie')) {
    return 'Accessories';
  }
  
  return 'Clothing';
}

function generateTags(title: string): string[] {
  const tags: string[] = [];
  const lower = title.toLowerCase();
  
  // Brand tags
  const brands = ['Supreme', 'Nike', 'Adidas', 'Palace', 'Chrome Hearts', 'Stone Island', 
                  'Moncler', 'Balenciaga', 'Rick Owens', 'Stussy', 'Travis Scott'];
  
  for (const brand of brands) {
    if (lower.includes(brand.toLowerCase())) {
      tags.push(brand);
    }
  }
  
  // Style tags
  if (lower.includes('vintage') || lower.includes('retro')) tags.push('Vintage');
  if (lower.includes('streetwear')) tags.push('Streetwear');
  if (lower.includes('luxury')) tags.push('Luxury');
  
  return tags.slice(0, 3);
}

function generateDescription(title: string): string {
  return `Premium ${title} - High-quality replica available through our trusted sourcing network.`;
}
