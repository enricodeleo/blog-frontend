export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string

  const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml`

  setHeader(event, 'content-type', 'text/plain')
  return robots
})
