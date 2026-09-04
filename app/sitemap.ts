import { MetadataRoute } from 'next';
import { getTreatments, getTeamMembers, getBlogPosts } from '@/app/lib/db-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pearldental.ug';

  // Base pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  try {
    const [treatments, team, posts] = await Promise.all([
      getTreatments(),
      getTeamMembers(),
      getBlogPosts(),
    ]);

    const treatmentRoutes: MetadataRoute.Sitemap = treatments.map((t) => ({
      url: `${baseUrl}/treatments/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

    const teamRoutes: MetadataRoute.Sitemap = team.map((m) => ({
      url: `${baseUrl}/team/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    }));

    const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.publishedDate || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...treatmentRoutes, ...teamRoutes, ...blogRoutes];
  } catch (err) {
    console.error('Error generating sitemap dynamic routes:', err);
    return staticRoutes;
  }
}
