const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function(eleventyConfig) {
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
