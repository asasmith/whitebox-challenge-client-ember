'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { join } = require('path');
const { WatchedDir } = require('broccoli-source');
const compilePostCSS = require('broccoli-postcss-single');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  const tailwindBase = join(__dirname, 'app', 'tailwind');
  const plugins = [require('tailwindcss')(join(tailwindBase, 'config.js'))];
  console.log(plugins)

  if (EmberApp.env() === 'production') {
    plugins.push({
        module: require('@fullhuman/postcss-purgecss'),
        options: [
          join(__dirname, 'app', 'index.html'),
          join(__dirname, 'app', '**', '*.js'),
          join(__dirname, 'app', '**', '*.hbs'),
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        whitelistPattern: [/^_/],
    });
  }

  const tailwindNode = compilePostCSS(
    new WatchedDir(tailwindBase),
    'index.css',
    'assets/tailwind.css',
    { /*browsers,*/ cacheInclude: [/.*\.(css|js)$/], plugins},
  );
  
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('netlify.toml', {
    destDir: '/',
  });

  return app.toTree([tailwindNode]);
};
