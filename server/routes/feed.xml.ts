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
    // Fallback: return empty feed
  }

  const items = posts
    .map(post => {
      const date = post.date ? new Date(post.date).toUTCString() : ''
      const categories = parseJSONField(post.categories)
      return `  <item>
    <title>${escapeXML(post.title)}</title>
    <id>${escapeXML(`${siteUrl}${post.path}`)}</id>
    <link>${escapeXML(`${siteUrl}${post.path}`)}</link>
    <description>${escapeXML(post.description || '')}</description>
    <pubDate>${date}</pubDate>
    <author>${escapeXML('hello@enricodeleo.com')} (${escapeXML('Enrico Deleo')})</author>
    ${categories.map(cat => `<category>${escapeXML(cat)}</category>`).join('\n    ')}
  </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
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

  event.node.res.setHeader('content-type', 'application/xml')
  return rss
})
