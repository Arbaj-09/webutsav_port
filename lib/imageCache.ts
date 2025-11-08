import { convertToPng } from './imageUtils';

// Simple in-memory cache for converted images
const imageCache = new Map<string, string>();

// Function to get a converted image from cache or convert it
export async function getCachedImage(imageUrl: string): Promise<string | null> {
  // Return cached image if available
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl) || null;
  }
  
  try {
    // Convert image to PNG
    const pngBuffer = await convertToPng(imageUrl);
    
    if (pngBuffer) {
      // Convert to data URL and cache it
      const dataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;
      imageCache.set(imageUrl, dataUrl);
      return dataUrl;
    }
    
    // If conversion failed, return null
    return null;
  } catch (error) {
    console.warn('Error converting image:', error);
    return null;
  }
}

// Function to preload all images
export async function preloadAllImages(products: any[], clients: any[]) {
  const imageUrls = new Set<string>();
  
  // Collect all image URLs
  products.forEach(product => {
    if (product.logo) {
      const url = product.logo.startsWith('http') ? product.logo : 
                  product.logo.startsWith('/') ? `https://webutsav.com${product.logo}` :
                  `https://webutsav.com/${product.logo}`;
      imageUrls.add(url);
    }
  });
  
  clients.forEach(client => {
    if (client.logo) {
      const url = client.logo.startsWith('http') ? client.logo : 
                  client.logo.startsWith('/') ? `https://webutsav.com${client.logo}` :
                  `https://webutsav.com/${client.logo}`;
      imageUrls.add(url);
    }
  });
  
  console.log(`Preloading ${imageUrls.size} images...`);
  
  // Convert all images in parallel
  const conversionPromises = Array.from(imageUrls).map(async (url) => {
    try {
      const dataUrl = await getCachedImage(url);
      return { url, dataUrl };
    } catch (error) {
      console.warn(`Failed to preload image ${url}:`, error);
      return { url, dataUrl: null };
    }
  });
  
  const results = await Promise.all(conversionPromises);
  
  // Update cache with results
  results.forEach(({ url, dataUrl }) => {
    if (dataUrl) {
      imageCache.set(url, dataUrl);
    }
  });
  
  console.log(`Preloaded ${results.filter(r => r.dataUrl).length} images successfully`);
  
  return imageCache;
}

// Function to get all cached images as a map
export function getAllCachedImages(): Map<string, string> {
  return new Map(imageCache);
}