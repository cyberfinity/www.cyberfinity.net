const nunjucks = require('nunjucks');
const templateBldPaths = require('@cyberfinity/www-templates/build-api');
const bldPaths = require('./build-api');


module.exports = function(eleventyConfig) {
  // Customise Nunjucks environment, so that it can
  // load templates from our @cyberfinity/www-templates
  // package.
  let nunjucksEnvironment = new nunjucks.Environment([
    new nunjucks.FileSystemLoader([
      // Look in @cyberfinity/www-templates first...
      templateBldPaths.distTemplatesDir,

      // ...then look in local templates dir
      bldPaths.srcPath(bldPaths.srcTemplateDirname),
    ])
  ]);
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  return {
    dir: {
      input: bldPaths.srcDir,
      output: bldPaths.distDir,

      includes: bldPaths.srcTemplateDirname,
      data: bldPaths.srcDataDirname,
    },
  };
};
