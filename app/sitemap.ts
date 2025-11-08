import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://webutsav.com'
  return [
    { url: base + '/', lastModified: new Date() },
    { url: base + '/products/managifyhr', lastModified: new Date() },
    { url: base + '/products/routebudget', lastModified: new Date() },
  ]
}
