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
  console.warn('Content database not found, skipping feed generation')
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

function generateRSS(posts) {
  const items = posts
    .filter(post => post.published !== false)
    .map(post => {
      const date = new Date(post.date).toUTCString()
      return `  <item>
    <title>${escapeXML(post.title)}</title>
    <id>${escapeXML(`${siteUrl}${post.path}`)}</id>
    <link>${escapeXML(`${siteUrl}${post.path}`)}</link>
    <description>${escapeXML(post.description || '')}</description>
    <pubDate>${date}</pubDate>
    <author>${escapeXML('hello@enricodeleo.com')} (${escapeXML('Enrico Deleo')})</author>
    ${post.categories && post.categories.length ? post.categories.map(cat => `    <category>${escapeXML(cat)}</category>`).join('\n    ') : ''}
  </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXML('Lisergico')}</title>
    <atom:link href="${escapeXML(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <link>${escapeXML(siteUrl)}</link>
    <description>${escapeXML('Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant')}</description>
    <language>it-IT</language>
    <managingEditor>${escapeXML('hello@enricodeleo.com')} (${escapeXML('Enrico Deleo')})</managingEditor>
${items}
  </channel>
</rss>`
}

// Generate and write feed.xml
const rss = generateRSS(posts)
const outputPath = join(__dirname, '../static/feed.xml')
writeFileSync(outputPath, rss, 'utf-8')
console.log(`✓ Generated feed.xml with ${posts.length} items`)
