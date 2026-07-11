import { defineEventHandler } from 'h3'
import Database from 'better-sqlite3'
import { join } from 'path'

export default defineEventHandler((event) => {
  const envUrl = process.env.NUXT_ENV_FRONTEND_URL
  const siteUrl = envUrl && !envUrl.includes('localhost') ? envUrl : 'https://blog.enricodeleo.com'

  function escapeXML(str: string) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  function parseJSONField(field: string | null | undefined): string[] {
    if (!field) return []
    try { return JSON.parse(field) } catch { return [] }
  }

  // Read from content database
  const dbPath = join(process.cwd(), '.data/content/contents.sqlite')
  let posts: any[] = []

  try {
    const db = new Database(dbPath, { readonly: true })
    posts = db.prepare("SELECT * FROM _content_articles WHERE navigation = 'true' ORDER BY date DESC").all()
    db.close()
  } catch {
    // Fallback: return minimal sitemap
  }

  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 },
    { url: '/en', changefreq: 'weekly', priority: 0.7 }
  ]

  // Article pages
  // `legacy` posts (pre-2023 personal archive, or later personal posts flagged
  // manually) get a lower crawl priority so they don't compete with current content.
  const postPages = posts.map(post => ({
    url: post.path,
    lastmod: (post.updated || post.date) ? new Date(post.updated || post.date).toISOString() : undefined,
    changefreq: post.legacy ? 'yearly' : 'weekly',
    priority: post.legacy ? 0.4 : 0.8
  }))

  // Category pages
  const categories = new Set<string>()
  posts.forEach(post => {
    parseJSONField(post.categories).forEach(cat => categories.add(cat.toLowerCase()))
  })

  const categoryPages = Array.from(categories).map(cat => ({
    url: `/category/${encodeURIComponent(cat)}`,
    changefreq: 'weekly',
    priority: 0.6
  }))

  const allPages = [...staticPages, ...postPages, ...categoryPages]

  const urls = allPages
    .map(page => {
      const lastmod = page.lastmod ? `    <lastmod>${page.lastmod}</lastmod>\n` : ''
      return `  <url>
    <loc>${escapeXML(`${siteUrl}${page.url}`)}</loc>
${lastmod}    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  event.node.res.setHeader('content-type', 'application/xml')
  return xml
})
