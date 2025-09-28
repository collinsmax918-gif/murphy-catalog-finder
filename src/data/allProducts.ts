import { Product } from "@/types/product";
import { parseProductsFromText } from "@/utils/productParser";
import { loadAllProducts } from "@/utils/loadProducts";

// Parse and export all products from inline data
export const allProducts: Product[] = parseProductsFromText(`[[NO_IMAGE]] (Nike Air Max x CDG Air Max 95 ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Beetroot ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max Honey Black (Corteiz) ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Neon ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Anthracite ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Pink Foam ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Solar Red ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Syna World ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 White ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Air Max 95 Black ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Anatomy Of Air AM95 ) {ITaoBay} -uncategorized-
[[NO_IMAGE]] (Anatomy Of Air AM95 (Better quality)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Disco Purple AM95 ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (ACW TN) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike OG TN Hyper Blue) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike OG TN Purple) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike OG TN Orange) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike TN Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike TN White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Budget LV Skates) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Air Max 90 Halloween) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CDG Air Max TL Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CDG Air Max TL Black/White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CDG Air Max TL White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme 98 Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme 98 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme 98 Brown) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme 98 Pink) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Nocta Hotstep 2 Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Nocta Hotstep 2 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Nocta Hotstep 2 Eggplant) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Corteiz Air Max 95 (Best Batch)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Heat Reactive Shox TL) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (AF1 (29 Colours) ) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 (29 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Air Max 95's (19 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy Slides (31 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Dunk Lows (27 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike SB Dunk Lows (27 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Asics (33 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Adidas Sambas (29 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Adidas Campus (33 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 350 (27 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Budget Batch (29 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott Jordans Budget (19 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike TN (31 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 1 High (28 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 3 (27 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 11 (29 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 5 (27 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Dior B22 (14 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Dior B30 (31 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Alexander Mcqueen (21 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (LV Sneakers (33 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (New Balance Shoes (24 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (New Balance Shoes (32 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (New Balance Shoes (16 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (New Balance Shoes (27 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Birkenstock (27 Styles)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Balenciaga Sneakers (30 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Balenciaga Sneakers (31 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (MiharaYasuhiro Sneakers (21 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Bape x Crocs) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Triple White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Metalic Silver) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Coconut Milk) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Triple Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Black/White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Light Iron) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike P6000 Flat Pewter) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Asics Gel NYC) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Best Prada Cup Batch (36 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Prada Cup) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Dior B22 Best Batch (10 Colours)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Air Max DN8) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Air Max DN) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Air Max DN Supreme) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme Air Max 95 (GX Batch)) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stussy AF1 Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stussy AF1 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stussy AF1 Fossil) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stussy AF1 Hemp) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott AF1 Cactus Jack) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (OFF White AF1 Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (OFF White AF1 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CLOT AF1 Blue) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CLOT AF1 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme AF1 Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme AF1 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CDG AF1 White) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (CDG AF1 Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Black Cat) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 White Cement) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Military Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 University Blue) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Red Thunder) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Bred) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Cool Grey) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Jordan 4 Pure Money) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott Jordan 4 Purple) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott Jordan 4 Olive) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (OFF White Jordan 4 Sail) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Dunk Low Panda) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Dunk Low Chicago) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Dunk Low Kentucky) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Dunk Low UNC) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Nike Dunk Low Syracuse) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott Hoodie Brown) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott Hoodie Black) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme Box Logo Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Chrome Hearts Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stussy Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Fear of God Essentials Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Balenciaga Logo Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (OFF White Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Chrome Hearts T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Travis Scott T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stussy T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Fear of God Essentials T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Balenciaga T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Chrome Hearts Chain) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Chrome Hearts Ring) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Chrome Hearts Bracelet) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Louis Vuitton Chain) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Dior Chain) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Cartier Watch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Rolex Watch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Louis Vuitton Bag) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Dior Bag) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Balenciaga Bag) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 500 Stone) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 500 Blush) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 500 Salt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 700 Wave Runner) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 700 Mauve) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Yeezy 700 Static) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Converse Chuck Taylor High) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Converse Chuck Taylor Low) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Vans Old Skool) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Vans Sk8-Hi) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Rick Owens DRKSHDW Sneakers) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Maison Margiela GATs) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Golden Goose Deluxe Brand) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stone Island Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stone Island Sweatshirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Stone Island Jacket) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Moncler Maya Jacket) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Moncler Polo Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Canada Goose Jacket) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Patagonia Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (North Face Puffer) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Arc'teryx Jacket) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Carhartt WIP Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Dickies Work Pants) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Levi's 501 Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Wrangler Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Diesel Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (True Religion Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Amiri Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Gallery Dept Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Fear of God Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Rhude Jeans) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Bape Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Bape T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Bape Shorts) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Anti Social Social Club Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Palace Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Palace T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Kith Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Brain Dead T-Shirt) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Golf Wang Hoodie) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Tyler The Creator Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Playboi Carti Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Kanye West Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Drake Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (The Weeknd Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Kendrick Lamar Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Frank Ocean Merch) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Virgil Abloh Collection) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (KAWS Figurine) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Bearbrick 400%) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Supreme Skateboard Deck) {ITaoBuy} -uncategorized-
[[NO_IMAGE]] (Palace Skateboard Deck) {ITaoBuy} -uncategorized-`);

// Export the products (keeping name consistent with current usage)
export const products: Product[] = allProducts;