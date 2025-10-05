import { Product } from "@/types/product";

// Import shoe images
import nikeAirMaxCDG951 from "@/assets/products/nike-air-max-cdg-95-1.jpg";
import nikeAirMaxCDG952 from "@/assets/products/nike-air-max-cdg-95-2.jpg";
import nikeAirMaxCDG953 from "@/assets/products/nike-air-max-cdg-95-3.jpg";
import nikeAirMax95Beetroot from "@/assets/products/nike-air-max-95-beetroot.jpg";
import nikeAirMaxHoneyBlackCorteiz from "@/assets/products/nike-air-max-honey-black-corteiz.jpg";
import nikeAirMax95Neon from "@/assets/products/nike-air-max-95-neon.jpg";
import nikeAirMax95Anthracite from "@/assets/products/nike-air-max-95-anthracite.jpg";
import nikeAirMax95PinkFoam from "@/assets/products/nike-air-max-95-pink-foam.jpg";
import nikeAirMax95SolarRed from "@/assets/products/nike-air-max-95-solar-red.jpg";
import nikeAirMax95SynaWorld from "@/assets/products/nike-air-max-95-syna-world.jpg";

// Original 10 shoes with local images
export const originalShoes: Product[] = [
  {
    sku: "NIKE-CDG-95-1",
    title: "Nike Air Max x CDG Air Max 95",
    store: "ITaoBuy",
    category: "Shoes",
    price: 299.99,
    image_url: nikeAirMaxCDG951,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456789",
    tags: ["Nike", "CDG", "Air Max"],
    description: "Exclusive Nike Air Max 95 collaboration with Comme des Garçons featuring premium materials and iconic design.",
    inStock: true
  },
  {
    sku: "NIKE-CDG-95-2",
    title: "Nike Air Max x CDG Air Max 95",
    store: "ITaoBuy",
    category: "Shoes",
    price: 299.99,
    image_url: nikeAirMaxCDG952,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456790",
    tags: ["Nike", "CDG", "Air Max"],
    description: "Exclusive Nike Air Max 95 collaboration with Comme des Garçons featuring premium materials and iconic design.",
    inStock: true
  },
  {
    sku: "NIKE-CDG-95-3",
    title: "Nike Air Max x CDG Air Max 95",
    store: "ITaoBuy",
    category: "Shoes",
    price: 299.99,
    image_url: nikeAirMaxCDG953,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456791",
    tags: ["Nike", "CDG", "Air Max"],
    description: "Exclusive Nike Air Max 95 collaboration with Comme des Garçons featuring premium materials and iconic design.",
    inStock: true
  },
  {
    sku: "NIKE-AM95-BEETROOT",
    title: "Nike Air Max 95 Beetroot",
    store: "ITaoBuy",
    category: "Shoes",
    price: 189.99,
    image_url: nikeAirMax95Beetroot,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456792",
    tags: ["Nike", "Air Max", "Beetroot"],
    description: "Nike Air Max 95 in the vibrant Beetroot colorway, featuring the classic Air Max cushioning.",
    inStock: true
  },
  {
    sku: "NIKE-AM-HONEY-BLACK",
    title: "Nike Air Max Honey Black (Corteiz)",
    store: "ITaoBuy",
    category: "Shoes",
    price: 249.99,
    image_url: nikeAirMaxHoneyBlackCorteiz,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456793",
    tags: ["Nike", "Corteiz", "Air Max"],
    description: "Limited edition Nike Air Max Honey Black collaboration with Corteiz, featuring exclusive design elements.",
    inStock: true
  },
  {
    sku: "NIKE-AM95-NEON",
    title: "Nike Air Max 95 Neon",
    store: "ITaoBuy",
    category: "Shoes",
    price: 199.99,
    image_url: nikeAirMax95Neon,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456794",
    tags: ["Nike", "Air Max", "Neon"],
    description: "Classic Nike Air Max 95 in the iconic Neon colorway, a true streetwear staple.",
    inStock: true
  },
  {
    sku: "NIKE-AM95-ANTHRACITE",
    title: "Nike Air Max 95 Anthracite",
    store: "ITaoBuy",
    category: "Shoes",
    price: 189.99,
    image_url: nikeAirMax95Anthracite,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456795",
    tags: ["Nike", "Air Max", "Anthracite"],
    description: "Nike Air Max 95 in sleek Anthracite, perfect for any streetwear outfit.",
    inStock: true
  },
  {
    sku: "NIKE-AM95-PINK-FOAM",
    title: "Nike Air Max 95 Pink Foam",
    store: "ITaoBuy",
    category: "Shoes",
    price: 199.99,
    image_url: nikeAirMax95PinkFoam,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456796",
    tags: ["Nike", "Air Max", "Pink"],
    description: "Nike Air Max 95 in the stylish Pink Foam colorway, adding a pop of color to your collection.",
    inStock: true
  },
  {
    sku: "NIKE-AM95-SOLAR-RED",
    title: "Nike Air Max 95 Solar Red",
    store: "ITaoBuy",
    category: "Shoes",
    price: 199.99,
    image_url: nikeAirMax95SolarRed,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456797",
    tags: ["Nike", "Air Max", "Solar Red"],
    description: "Bold Nike Air Max 95 in Solar Red, making a statement with every step.",
    inStock: true
  },
  {
    sku: "NIKE-AM95-SYNA-WORLD",
    title: "Nike Air Max 95 Syna World",
    store: "ITaoBuy",
    category: "Shoes",
    price: 249.99,
    image_url: nikeAirMax95SynaWorld,
    product_url: "https://www.itaobuy.com/product-detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456798",
    tags: ["Nike", "Air Max", "Syna World"],
    description: "Limited edition Nike Air Max 95 collaboration with Syna World, featuring unique design details.",
    inStock: true
  }
];
