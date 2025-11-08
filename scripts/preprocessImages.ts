import { convertToPng, getImageDataUrl } from '../lib/imageUtils';
import products from '../data/products.json';
import clients from '../data/clients.json';
import fs from 'fs/promises';
import path from 'path';

async function preprocessImages() {
  console.log('Preprocessing images...');
  
  // Process product images
  for (const product of products) {
    if (product.logo) {
      try {
        const dataUrl = await getImageDataUrl(product.logo);
        if (dataUrl) {
          console.log(`Processed image for product: ${product.title}`);
        }
      } catch (error) {
        console.warn(`Failed to process image for product ${product.title}:`, error);
      }
    }
  }
  
  // Process client images
  for (const client of clients) {
    if (client.logo) {
      try {
        const dataUrl = await getImageDataUrl(client.logo);
        if (dataUrl) {
          console.log(`Processed image for client: ${client.title}`);
        }
      } catch (error) {
        console.warn(`Failed to process image for client ${client.title}:`, error);
      }
    }
  }
  
  console.log('Image preprocessing complete.');
}

// Run the preprocessing
preprocessImages().catch(console.error);