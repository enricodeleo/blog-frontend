import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

// Read the content collection database
const contentDbPath = join(__dirname, '../.data/content.db')
let posts = []

try {
  const contentDb = JSON.parse(readFileSync(contentDbPath, 'utf-8'))
  posts = contentDb.articles || []
} catch (error) {
  console.warn('Content database not found, skipping sitemap generation')
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

function formatDate(date) {
  return new Date(date).toISOString()
}

function generateSitemap(posts) {
  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 },
    { url: '/search', changefreq: 'monthly', priority: 0.5 }
  ]

  // Dynamic pages from posts
  const postPages = posts
    .filter(post => post.published !== false)
    .map(post => ({
      url: post.path,
      lastmod: formatDate(post.date),
      changefreq: 'weekly',
      priority: 0.8
    }))

  // Category and tag pages
  const categories = new Set()
  const tags = new Set()

  posts.forEach(post => {
    post.categories?.forEach(cat => categories.add(cat))
    post.tags?.forEach(tag => tags.add(tag))
  })

  const categoryPages = Array.from(categories).map(cat => ({
    url: `/category/${encodeURIComponent(cat.toLowerCase())}`,
    changefreq: 'weekly',
    priority: 0.6
  }))

  const tagPages = Array.from(tags).map(tag => ({
    url: `/tag/${encodeURIComponent(tag.toLowerCase())}`,
    changefreq: 'weekly',
    priority: 0.6
  }))

  const allPages = [...staticPages, ...postPages, ...categoryPages, ...tagPages]

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
const outputPath = join(__dirname, '../static/sitemap.xml')
writeFileSync(outputPath, sitemap, 'utf-8')
console.log(`✓ Generated sitemap.xml with ${posts.length} posts`)
