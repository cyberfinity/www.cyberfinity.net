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
    ],
    {
      noCache: true // works better when watching
    })
  ]);
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  return {
    dir: {
      input: bldPaths.srcRelPath(),
      output: bldPaths.distRelPath(),

      includes: bldPaths.srcTemplateDirname,
      data: bldPaths.srcDataDirname,
    },
  };
};
