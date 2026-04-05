import { execSync } from 'child_process'

console.log('\n🔧 Generating static files (feed.xml, sitemap.xml, robots.txt, llms.txt)...')

try {
  // Generate feed.xml
  console.log('  → Generating feed.xml...')
  execSync('bun run scripts/generate-feed.js', { stdio: 'inherit' })

  // Generate sitemap.xml
  console.log('  → Generating sitemap.xml...')
  execSync('bun run scripts/generate-sitemap.js', { stdio: 'inherit' })

  console.log('✓ All static files generated successfully\n')
} catch (error) {
  console.error('✗ Error generating static files:', error.message)
  process.exit(1)
}
