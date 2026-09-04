import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/cms/'],
      },
    ],
    sitemap: 'https://pearldental.ug/sitemap.xml',
  };
}
