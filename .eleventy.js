const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginSEO = require('eleventy-plugin-seo');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSEO, require("./_data/seo.json"));
  // Universal filters add to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript (New in 0.7.0)

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor, {})

  eleventyConfig.addFilter("markdown", function(value) {
    return md.render(value);
  });
  return {
    pathPrefix: "/asyncapi-directory/"
  }
};
