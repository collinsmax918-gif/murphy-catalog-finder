import { removeBackground, loadImage } from './backgroundRemoval';

export const processTikTokIcon = async (): Promise<string> => {
  try {
    // Load the existing TikTok icon
    const response = await fetch('/src/assets/tiktok-icon.webp');
    const blob = await response.blob();
    
    // Convert to image element
    const imageElement = await loadImage(blob);
    
    // Remove background
    const processedBlob = await removeBackground(imageElement);
    
    // Convert to data URL for use in React
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(processedBlob);
    });
  } catch (error) {
    console.error('Error processing TikTok icon:', error);
    // Fallback to original icon
    return '/src/assets/tiktok-icon.webp';
  }
};