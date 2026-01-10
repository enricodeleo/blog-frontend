import { writeFileSync } from 'fs'
import { join } from 'path'
import Database from 'better-sqlite3'

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

// Read the content collection database from SQLite (relative to project root)
const contentDbPath = join(process.cwd(), '.data/content/contents.sqlite')
let posts = []

try {
  const db = new Database(contentDbPath, { readonly: true })
  const stmt = db.prepare('SELECT * FROM _content_articles WHERE navigation = true ORDER BY date DESC')
  posts = stmt.all()
  db.close()
} catch (error) {
  console.warn('Content database not found, skipping feed generation')
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

function generateRSS(posts) {
  const items = posts
    .filter(post => post.navigation !== false)
    .map(post => {
      const date = new Date(post.date).toUTCString()
      const categories = parseJSONField(post.categories)
      return `  <item>
    <title>${escapeXML(post.title)}</title>
    <id>${escapeXML(`${siteUrl}${post.path}`)}</id>
    <link>${escapeXML(`${siteUrl}${post.path}`)}</link>
    <description>${escapeXML(post.description || '')}</description>
    <pubDate>${date}</pubDate>
    <author>${escapeXML('hello@enricodeleo.com')} (${escapeXML('Enrico Deleo')})</author>
    ${categories.length ? categories.map(cat => `    <category>${escapeXML(cat)}</category>`).join('\n    ') : ''}
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
