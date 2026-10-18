import { site } from '$data/site.js';
import { posts } from '$data/blog.js';

export const prerender = true;

/**
 * NOTE: the sitemap namespace must be the http:// form. The previous version of
 * this site used https://www.sitemaps.org/... which is not a valid namespace URI
 * and caused validators and Search Console to reject the file.
 */
export function GET() {
	const lastmod = new Date().toISOString().split('T')[0];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${site.url}${site.ogImage}</image:loc>
      <image:title>${site.name} | ${site.role}</image:title>
    </image:image>
  </url>
${posts
	.map(
		(post) => `  <url>
    <loc>${site.url}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
