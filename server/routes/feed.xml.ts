export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string

  // Fetch all posts
  const posts = await queryContent('articles')
    .sort({ date: -1 })
    .find()

  // Generate RSS XML
  const feedItems = posts.map((post: any) => ({
    title: post.title,
    id: `${siteUrl}/${post.slug}`,
    link: `${siteUrl}/${post.slug}`,
    description: post.description,
    date: new Date(post.date),
    category: post.categories,
    author: {
      name: 'Enrico Deleo',
      email: 'hello@enricodeleo.com',
      link: 'https://enricodeleo.com'
    }
  }))

  const feed = {
    title: 'Lisergico',
    id: siteUrl,
    link: siteUrl,
    description: 'Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant',
    language: 'it-IT',
    feedLinks: {
      rss: `${siteUrl}/feed.xml`
    },
    author: {
      name: 'Enrico Deleo',
      email: 'hello@enricodeleo.com',
      link: 'https://enricodeleo.com'
    },
    items: feedItems
  }

  // Convert to RSS XML
  const xml = generateRSS(feed)

  setHeader(event, 'content-type', 'application/xml')
  return xml
})

function generateRSS(feed: any): string {
  const items = feed.items.map((item: any) => `  <item>
    <title>${escapeXML(item.title)}</title>
    <id>${escapeXML(item.id)}</id>
    <link>${escapeXML(item.link)}</link>
    <description>${escapeXML(item.description)}</description>
    <pubDate>${item.date.toUTCString()}</pubDate>
    <author>${escapeXML(item.author.email)} (${escapeXML(item.author.name)})</author>
    ${item.category ? item.category.map((cat: string) => `<category>${escapeXML(cat)}</category>`).join('') : ''}
  </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXML(feed.title)}</title>
    <atom:link href="${escapeXML(feed.feedLinks.rss)}" rel="self" type="application/rss+xml" />
    <link>${escapeXML(feed.link)}</link>
    <description>${escapeXML(feed.description)}</description>
    <language>${escapeXML(feed.language)}</language>
    <managingEditor>${escapeXML(feed.author.email)} (${escapeXML(feed.author.name)})</managingEditor>
    ${items}
  </channel>
</rss>`
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
