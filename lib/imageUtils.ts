import sharp from 'sharp';
import https from 'https';
import http from 'http';

// Function to convert any image to PNG
export async function convertToPng(imageUrl: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    // Skip conversion for the cover image since it's already PNG
    if (imageUrl.includes('cover%20photo.png')) {
      resolve(null); // Return null to use the original URL
      return;
    }
    
    const client = imageUrl.startsWith('https') ? https : http;
    
    client.get(imageUrl, (response) => {
      // If the image is not found, return null
      if (response.statusCode === 404) {
        console.warn(`Image not found: ${imageUrl}`);
        resolve(null);
        return;
      }
      
      // If there's any other error status, return null
      if (response.statusCode !== 200) {
        console.warn(`Failed to fetch image ${imageUrl}: ${response.statusCode}`);
        resolve(null);
        return;
      }
      
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', async () => {
        try {
          const imageBuffer = Buffer.concat(chunks);
          // Convert to PNG using sharp
          const pngBuffer = await sharp(imageBuffer)
            .png()
            .toBuffer();
          resolve(pngBuffer);
        } catch (error) {
          console.warn(`Error converting image to PNG ${imageUrl}:`, error);
          resolve(null);
        }
      });
    }).on('error', (error) => {
      console.warn(`Network error fetching image ${imageUrl}:`, error);
      resolve(null);
    });
  });
}

// Function to get image data URL
export async function getImageDataUrl(imageUrl: string): Promise<string | null> {
  try {
    const pngBuffer = await convertToPng(imageUrl);
    if (pngBuffer) {
      return `data:image/png;base64,${pngBuffer.toString('base64')}`;
    }
    return null;
  } catch (error) {
    console.warn('Error getting image data URL:', error);
    return null;
  }
}

// Preprocess all images and return a map of image URLs to data URLs
export async function preprocessAllImages(products: any[], clients: any[]) {
  const imageMap = new Map<string, string>();
  
  // Process all product images
  for (const product of products) {
    if (product.logo) {
      try {
        const imageUrl = product.logo.startsWith('http') ? product.logo : 
                        product.logo.startsWith('/') ? `https://webutsav.com${product.logo}` :
                        `https://webutsav.com/${product.logo}`;
        
        const dataUrl = await getImageDataUrl(imageUrl);
        if (dataUrl) {
          imageMap.set(imageUrl, dataUrl);
        }
      } catch (error) {
        console.warn(`Error processing product image for ${product.title}:`, error);
      }
    }
  }
  
  // Process all client images
  for (const client of clients) {
    if (client.logo) {
      try {
        const imageUrl = client.logo.startsWith('http') ? client.logo : 
                        client.logo.startsWith('/') ? `https://webutsav.com${client.logo}` :
                        `https://webutsav.com/${client.logo}`;
        
        const dataUrl = await getImageDataUrl(imageUrl);
        if (dataUrl) {
          imageMap.set(imageUrl, dataUrl);
        }
      } catch (error) {
        console.warn(`Error processing client image for ${client.title}:`, error);
      }
    }
  }
  
  return imageMap;
}