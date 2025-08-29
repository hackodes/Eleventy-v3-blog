module.exports = function(eleventyConfig) {
    // Copy assets to output directory
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addWatchTarget("assets");
  
    // Explicitly create a "posts" collection from the posts directory
    eleventyConfig.addCollection("posts", function(collectionApi) {
      return collectionApi.getFilteredByGlob("posts/**/*.md");
    });
  
    // Simple readableDate filter using JavaScript Date
    eleventyConfig.addFilter("simpleDate", (dateObj) => {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    });
  
    return {
      dir: {
        input: ".",
        includes: "_includes",
        data: "_data",
        output: "_site"
      },
      templateFormats: ["njk", "md", "html"],
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk"
    };
  };