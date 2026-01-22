import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('\n🔧 Generating static files (feed.xml, sitemap.xml, robots.txt, llms.txt)...')

try {
  // Generate feed.xml
  console.log('  → Generating feed.xml...')
  execSync('node scripts/generate-feed.js', { stdio: 'inherit' })

  // Generate sitemap.xml
  console.log('  → Generating sitemap.xml...')
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' })

  // Generate robots.txt
  console.log('  → Generating robots.txt...')
  execSync('node scripts/generate-robots.js', { stdio: 'inherit' })

  // Generate llms.txt
  console.log('  → Generating llms.txt...')
  execSync('node scripts/generate-llm.js', { stdio: 'inherit' })

  console.log('✓ All static files generated successfully\n')
} catch (error) {
  console.error('✗ Error generating static files:', error.message)
  process.exit(1)
}
