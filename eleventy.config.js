export default function(eleventyConfig) {
  // Copy assets to output directory
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets");

  // Explicitly create a "posts" collection from the posts directory
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md");
  });

  // Simple date format filter
  eleventyConfig.addFilter("simpleDate", (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  return {
    dir: {
      input: "src",         
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}