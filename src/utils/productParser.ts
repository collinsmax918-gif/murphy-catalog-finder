import { Product } from "@/types/product";

// Parse the raw product data from the uploaded file
export function parseProductsFromText(text: string): Product[] {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const products: Product[] = [];
  
  let currentEntry = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('[[NO_IMAGE]]') || line.startsWith('"[[NO_IMAGE]]')) {
      // If we have a current entry, process it
      if (currentEntry) {
        const product = parseProductLine(currentEntry, products.length + 1);
        if (product) {
          products.push(product);
        }
      }
      // Start new entry
      currentEntry = line;
    } else if (currentEntry && line) {
      // Continue building current entry
      currentEntry += ' ' + line;
    }
  }
  
  // Process the last entry
  if (currentEntry) {
    const product = parseProductLine(currentEntry, products.length + 1);
    if (product) {
      products.push(product);
    }
  }
  
  return products;
}

function parseProductLine(line: String, index: number): Product | null {
  // Clean up the line
  line = line.replace(/^"/, '').replace(/"$/, '');
  
  // Parse the format: [[NO_IMAGE]] (Product Name) {Store} -category-
  const regex = /\[\[NO_IMAGE\]\]\s*\(([^)]+)\)\s*\{([^}]+)\}\s*-([^-]+)-/;
  const match = line.match(regex);
  
  if (!match) {
    console.warn('Could not parse line:', line);
    return null;
  }
  
  const [, title, store, category] = match;
  
  // Clean up extracted values
  const cleanTitle = title.trim();
  const cleanStore = store.trim();
  const cleanCategory = category.trim();
  
  // Skip invalid entries
  if (cleanStore === '[NO_LINK]' || cleanStore === 'SOON') {
    return null;
  }
  
  // Generate category based on product name
  const detectedCategory = detectCategory(cleanTitle);
  
  // Generate realistic pricing based on product type
  const price = generatePrice(cleanTitle, detectedCategory);
  
  // Generate placeholder image URL
  const imageUrl = generatePlaceholderImage(cleanTitle, detectedCategory);
  
  return {
    sku: `MF-${String(index).padStart(4, '0')}`,
    title: cleanTitle,
    store: cleanStore,
    category: detectedCategory,
    price: price,
    image_url: imageUrl,
    product_url: `https://itaobuy.com/search?q=${encodeURIComponent(cleanTitle)}`,
    tags: generateTags(cleanTitle, cleanStore),
    description: generateDescription(cleanTitle, detectedCategory),
    inStock: Math.random() > 0.1 // 90% in stock
  };
}

function detectCategory(title: string): string {
  const titleLower = title.toLowerCase();
  
  // Shoes
  if (titleLower.includes('air max') || titleLower.includes('jordan') || 
      titleLower.includes('dunk') || titleLower.includes('af1') ||
      titleLower.includes('yeezy') || titleLower.includes('nike') ||
      titleLower.includes('adidas') || titleLower.includes('asics') ||
      titleLower.includes('new balance') || titleLower.includes('sneaker') ||
      titleLower.includes('shoe') || titleLower.includes('boot') ||
      titleLower.includes('slide') || titleLower.includes('crocs')) {
    return 'Shoes';
  }
  
  // Clothing
  if (titleLower.includes('hoodie') || titleLower.includes('tee') ||
      titleLower.includes('shirt') || titleLower.includes('puffer') ||
      titleLower.includes('jacket') || titleLower.includes('cargo') ||
      titleLower.includes('denim') || titleLower.includes('vest') ||
      titleLower.includes('polo') || titleLower.includes('longsleeve')) {
    return 'Clothing';
  }
  
  // Accessories
  if (titleLower.includes('chain') || titleLower.includes('pendant') ||
      titleLower.includes('ring') || titleLower.includes('glasses') ||
      titleLower.includes('beanie') || titleLower.includes('hat') ||
      titleLower.includes('watch') || titleLower.includes('bracelet') ||
      titleLower.includes('necklace')) {
    return 'Accessories';
  }
  
  // Bags
  if (titleLower.includes('bag') || titleLower.includes('backpack') ||
      titleLower.includes('pouch') || titleLower.includes('wallet')) {
    return 'Bags';
  }
  
  return 'Fashion';
}

function generatePrice(title: string, category: string): number {
  const titleLower = title.toLowerCase();
  
  // Premium brands get higher prices
  if (titleLower.includes('dior') || titleLower.includes('louis vuitton') || 
      titleLower.includes('balenciaga') || titleLower.includes('chrome hearts')) {
    return Math.floor(Math.random() * 300) + 200; // $200-500
  }
  
  // Designer/Limited items
  if (titleLower.includes('travis scott') || titleLower.includes('supreme') ||
      titleLower.includes('cdg') || titleLower.includes('off white') ||
      titleLower.includes('best batch') || titleLower.includes('1:1')) {
    return Math.floor(Math.random() * 200) + 100; // $100-300
  }
  
  // Regular shoes
  if (category === 'Shoes') {
    return Math.floor(Math.random() * 100) + 50; // $50-150
  }
  
  // Clothing
  if (category === 'Clothing') {
    return Math.floor(Math.random() * 80) + 30; // $30-110
  }
  
  // Accessories
  if (category === 'Accessories') {
    return Math.floor(Math.random() * 150) + 25; // $25-175
  }
  
  // Default pricing
  return Math.floor(Math.random() * 100) + 40; // $40-140
}

function generatePlaceholderImage(title: string, category: string): string {
  // Generate better placeholder images based on product type
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Use a mix of different placeholder services for better variety
  const services = [
    `https://picsum.photos/seed/${cleanTitle}/400/400`,
    `https://loremflickr.com/400/400/${category.toLowerCase()}?random=${Math.abs(hashCode(title))}`,
    `https://source.unsplash.com/400x400/?${category.toLowerCase()}&sig=${Math.abs(hashCode(title))}`
  ];
  
  // Use hash of title to consistently pick the same service for the same product
  const serviceIndex = Math.abs(hashCode(title)) % services.length;
  return services[serviceIndex];
}

// Simple hash function for consistent image selection
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function generateTags(title: string, store: string): string[] {
  const tags: string[] = [];
  const titleLower = title.toLowerCase();
  
  // Brand tags
  if (titleLower.includes('nike')) tags.push('Nike');
  if (titleLower.includes('adidas')) tags.push('Adidas');
  if (titleLower.includes('jordan')) tags.push('Jordan');
  if (titleLower.includes('yeezy')) tags.push('Yeezy');
  if (titleLower.includes('supreme')) tags.push('Supreme');
  if (titleLower.includes('balenciaga')) tags.push('Balenciaga');
  if (titleLower.includes('dior')) tags.push('Dior');
  if (titleLower.includes('chrome hearts')) tags.push('Chrome Hearts');
  
  // Quality tags
  if (titleLower.includes('best batch') || titleLower.includes('1:1')) {
    tags.push('Premium Quality');
  }
  if (titleLower.includes('budget')) tags.push('Budget');
  
  // Color variations
  if (titleLower.includes('colours') || titleLower.includes('colors')) {
    const colorMatch = titleLower.match(/(\d+)\s+colou?rs?/);
    if (colorMatch) {
      tags.push(`${colorMatch[1]} Colors Available`);
    }
  }
  
  return tags.slice(0, 3); // Limit to 3 tags
}

function generateDescription(title: string, category: string): string {
  const descriptions = {
    'Shoes': `High-quality replica sneakers featuring premium materials and attention to detail. ${title} offers exceptional comfort and style for everyday wear.`,
    'Clothing': `Premium streetwear piece crafted with quality materials. ${title} combines style and comfort for the modern fashion enthusiast.`,
    'Accessories': `Luxury-inspired accessory that adds the perfect finishing touch to any outfit. ${title} features premium craftsmanship and attention to detail.`,
    'Bags': `Stylish and functional bag designed for everyday use. ${title} combines premium materials with practical design elements.`,
    'Fashion': `Premium fashion item that embodies contemporary style. ${title} is crafted with attention to detail and quality materials.`
  };
  
  return descriptions[category] || descriptions['Fashion'];
}