const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const fractal = require('@frctl/fractal').create();
const nunj = require('@frctl/nunjucks');

const bldPaths = require('./build-api');
const packageInfo = require('./package.json');

/* Set the title of the project */
fractal.set('project.title', 'Main Cyberfinity website HTML patterns');
fractal.set('project.version', packageInfo.version);


/* Tell Fractal where the components will live */
fractal.components.set('path', bldPaths.componentsDir);

// register the Nunjucks adapter for your components
fractal.components.engine(nunj({
  filters: {
    /*
      Optional attribute filter.

      If the input is truthy, it is output in the form
      of an attribute value. Otherwise, an empty string
      is returned.

      This is useful for HTML attributes that should only
      be added if their value is defined.
    */
    optattr(str, attrName) {
      if (str) {
        return ` ${attrName}="${str}"`;
      } else {
        return '';
      }
    },
  },
}));

// look for files with a .nunj file extension
fractal.components.set('ext', '.njk');


/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', bldPaths.docsDir);

// Set engine to Nunjucks
fractal.docs.engine(nunj);
fractal.docs.set('ext', '.md');


/* Tell Fractal which directory to serve up for static assets */
fractal.web.set('static.path', bldPaths.staticAssetsDir);

/* Tell Fractal which directory to build static HTML output to */
fractal.web.set('builder.dest', bldPaths.distPatternLibraryDir);

/* Tweak BrowserSync config */
fractal.web.set('server.syncOptions', {
  snippetOptions: {
    // Make BrowerSync JS snippet get appended
    // to <head> instead of <body>, so that it doesn't
    // interfere with our * + * CSS rules.
    rule: {
      fn(snippet, match) {
        return snippet + match;
      },
      match: /<\/head>/i,
    },
  },
});


// Add template export function
// Based on example in Fractal docs:
// https://fractal.build/guide/integration/including-as-dependency.html#_3-next-steps

/*
 * Fractal export command.
 *
 * Exports all view templates into a"templates"directory within the build output directory.
 * Templates are exported in a flat structure with the filenames in the format of {handle}.{ext}
 *
 * Any @handle references in the templates (for partial includes etc) are re-written
 * to reference the appropriate template path.
 *
 * Run by using the command `fractal export` in the root of the project directory.
 */
function exportTemplates(args, done) {

    const app = this.fractal;
    const items = app.components.flattenDeep().toArray();
    const jobs = [];

    return makeDir(bldPaths.distTemplatesDir).then(() => {

      for (const item of items) {

        const exportPath = path.join(bldPaths.distTemplatesDir, `${item.alias || item.handle}${app.get('components.ext')}`);
        const job = item.getContent().then(str => {
            return str.replace(/\@([0-9a-zA-Z\-\_]*)/g, function(match, handle){
                return `./${handle}${app.get('components.ext')}`;
            });
        }).then(str => {
            return fs.writeFileSync(exportPath, str);
        });

        jobs.push(job);
      }

      return Promise.all(jobs).then(() => {
        fractal.cli.log(`⚑ Exported ${jobs.length} templates`);
      });
    });
}

fractal.cli.command('export', exportTemplates,  {
    description: 'Export all component templates'
});



module.exports = fractal;
