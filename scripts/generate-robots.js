import { writeFileSync } from 'fs'
import { join } from 'path'

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml`

const outputPath = join(process.cwd(), 'static/robots.txt')
writeFileSync(outputPath, robots, 'utf-8')
console.log('✓ Generated robots.txt')
