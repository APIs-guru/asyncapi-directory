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

  function sorted(values) {
    return values.sort(function(a, b){
      if (a.data.name < b.data.name) return -1;
      if (a.data.name > b.data.name) return 1;
      return 0;
    });
  }

  eleventyConfig.addFilter("sorted", sorted);

  return {
    pathPrefix: "/asyncapi-directory/"
  }
};
