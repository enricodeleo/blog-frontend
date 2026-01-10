import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml`

const outputPath = join(__dirname, '../static/robots.txt')
writeFileSync(outputPath, robots, 'utf-8')
console.log('✓ Generated robots.txt')
