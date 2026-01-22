import { writeFileSync } from 'fs'
import { join } from 'path'
import Database from 'better-sqlite3'

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

// Read the content collection database from SQLite (relative to project root)
const contentDbPath = join(process.cwd(), '.data/content/contents.sqlite')
let posts = []

try {
  const db = new Database(contentDbPath, { readonly: true })
  const stmt = db.prepare("SELECT * FROM _content_articles WHERE navigation = 'true'")
  posts = stmt.all()
  db.close()
} catch (error) {
  console.warn('Content database not found, skipping sitemap generation')
  console.error(error.message)
  process.exit(0)
}

function escapeXML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function parseJSONField(field) {
  if (!field) return []
  try {
    return JSON.parse(field)
  } catch {
    return []
  }
}

function formatDate(date) {
  return new Date(date).toISOString()
}

function generateSitemap(posts) {
  // Static pages (only homepage - search and tags excluded for SEO)
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 }
  ]

  // Dynamic pages from posts
  const postPages = posts
    .filter(post => post.navigation === 'true')
    .map(post => ({
      url: post.path,
      lastmod: formatDate(post.date),
      changefreq: 'weekly',
      priority: 0.8
    }))

  // Category pages (tags excluded for SEO - too many, thin content)
  const categories = new Set()
  posts.forEach(post => {
    parseJSONField(post.categories).forEach(cat => categories.add(cat))
  })

  const categoryPages = Array.from(categories).map(cat => ({
    url: `/category/${encodeURIComponent(cat.toLowerCase())}`,
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

// Generate and write sitemap.xml
const sitemap = generateSitemap(posts)
const outputPath = join(process.cwd(), '.output/public/sitemap.xml')
writeFileSync(outputPath, sitemap, 'utf-8')
console.log(`✓ Generated sitemap.xml with ${posts.length} posts`)
