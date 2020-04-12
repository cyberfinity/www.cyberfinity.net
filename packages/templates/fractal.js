const fs = require('fs');
const {promisify} = require('util');
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

const filenamePrefix = '@';

// Promisified FS functions
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

/**
 * Returns the handle for the given component item.
 *
 * Note that the handle does NOT include the '@' prefix.
 *
 * @param {Component} item
 */
function getHandle(item) {
  return item.alias || item.handle;
}

/**
 * Returns the full file path for the exported template copy for the given
 * component item.
 *
 * @param {Component} item
 */
function getExportedTemplatePath(item) {
  return path.join(bldPaths.distTemplatesDir, `${filenamePrefix}${getHandle(item)}${fractal.get('components.ext')}`);
}

/**
 * Exports a copy of the given component item's template file.
 *
 * @param {Component} item
 */
async function exportTemplate(item) {
  if (!item.isHidden && !item.tags.includes('no-export')) {
    const exportPath = getExportedTemplatePath(item);
    const contents = item.content;

    contents.replace(/@([0-9a-zA-Z\-_]*)/g, (match, handle) => {
      return `./${filenamePrefix}${handle}${fractal.get('components.ext')}`;
    });

    await writeFile(exportPath, contents);
  }
}

/**
 * Deletes the exported template copy for the given component item.
 *
 * @param {Component} item
 */
async function deleteTemplate(item) {
  const exportPath = getExportedTemplatePath(item);

  await unlink(exportPath);
}

/*
 * Fractal export command.
 *
 * Exports all view templates into a "templates" directory within the build output directory.
 * Templates are exported in a flat structure with the filenames in the format of {handle}.{ext}
 *
 * Any @handle references in the templates (for partial includes etc) are re-written
 * to reference the appropriate template path.
 *
 * Run by using the command `fractal export` in the root of the project directory.
 */
async function exportTemplates() {
  const items = fractal.components.flattenDeep().toArray();
  const jobs = [];

  await makeDir(bldPaths.distTemplatesDir);
  for (const item of items) {
    jobs.push(exportTemplate(item));
  }

  await Promise.all(jobs);
  fractal.cli.log(`⚑ Exported ${jobs.length} templates`);
}


// Add export command to CLI
fractal.cli.command('export', exportTemplates, {
  description: 'Export all component templates',
});


// Use change event to detect file deletions
// This is because the corresponding item still exists in Fractal's
// components collection at this point.
fractal.on('source:changed', async (source, eventData) => {
  if (eventData.event === 'unlink' && eventData.isTemplate) {
    const template = source.find('viewPath', eventData.path);

    if (template) {
      await deleteTemplate(template, fractal);
      fractal.cli.log(`Deleted exported template @${getHandle(template)}!`);
    } else {
      fractal.cli.log(`Could not find ${eventData.path} in components collection`);
    }
  }

  // Ignore changes to non-templates
});


// Use updated event to detect file additions or changes
// This is because the corresponding item will in Fractal's
// components collection at this point.
fractal.on('source:updated', async (source, eventData) => {
  if ((eventData.event === 'add' || eventData.event === 'change') && eventData.isTemplate) {
    const template = source.find('viewPath', eventData.path);

    if (template) {
      await exportTemplate(template, fractal);
      fractal.cli.log(`Exported template @${getHandle(template)}!`);
    } else {
      fractal.cli.log(`Could not find ${eventData.path} in components collection`);
    }
  }

  // Ignore updates to non-templates
});


module.exports = fractal;
