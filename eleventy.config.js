import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'
import tailwindcss from '@tailwindcss/vite'

export default function (eleventyConfig) {
  // Enable Vite plugin with Tailwind CSS
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
    },
  })

  // Copy assets to output directory
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addWatchTarget('src/assets')

  // Explicitly create a "posts" collection from the posts directory
  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md')
  })

  // Date formatter for permalinks (no quotes needed!)
  eleventyConfig.addFilter('permalinkDate', (dateObj) => {
    const date = new Date(dateObj)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  })

  // Simple date format filter
  eleventyConfig.addFilter('simpleDate', (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  // HTML date format (for datetime attribute)
  eleventyConfig.addFilter('htmlDate', (dateObj) => {
    const date = new Date(dateObj)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  })

  // Strip HTML tags for excerpts
  eleventyConfig.addFilter('stripHtml', (content) => {
    return content.replace(/<[^>]*>/g, '')
  })

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
