Fresh Changelog
==================

3.0.8
------------------
- Update Luscious to v0.0.9
- Added README.md to `.prettierignore`

3.0.7
------------------
- Added HTML5 test content into pug partials
- Removed development/production environment variables.
- Removed html minification from `gulp concat` so that the task only works for concatenating and minifying js/css.
- Added a new task `gulp minify` to specifically handle html minification.
- Removed tasks specifically created to import project dependencies (`get:normalize`, `get:jquery`, `get:owlcarousel` and combined them all into a single task `gulp vendors` that is controlled by a config array `vendors`
- Removed tasks `gulp todo` and `gulp todo:clean` in favor of just using the ide built-in search feature
- Removed `gulp cms` and related tasks: `convert:404`, `convert:html`, `convert:css`, `touch:index`
- Combined tasks `clean:build` and `images:clean:cache` into a single task called `clean`
- Added task `gulp open` and alias `gulp o`. Task opens browser to specified file
- Fixed `html2pug` task that's used to convert html to pug in the `./src/views` directory.
- Moved main navigation data to the `site.json` file.
- Removed the `_skiplink.pug` file and placed the skiplink code directly in `_base.pug`.

3.0.6
------------------
- Hotfix to remove metalsmith tasks/dependencies that were accidentally merged into the production release.

3.0.5
------------------
- Changed install script task to `gulp initial:help` to give user feedback on how to set up initial SASS scaffold.

3.0.4
------------------
- Updated Luscious dependency to v0.0.5.
- Separated Pug dummy content into slightly smaller section files.

3.0.3
------------------
- Updated Gulp tasks. - Added Run-Sequence to `gulp default` task so that gulp finishes before browser window loads. - Added Gulp-data to merge multiple data files into a single file for use with Pug. - Added data files to `gulp watch`. - Added `gulp normalize:css` task. - Added `basedir` option to pug task so that the `basedir` is set to `./src/views`. - Moved install.js scripts to a gulp task as `gulp luscious` and `gulp scaffold`. - Added `gulp fontawesome` task to move fonts from `node_modules` to `./build`.
- Added basic navigation to Pug and JS. SASS styles are added through Luscious.
- Added skiplink to Pug and JS. SASS styles are added through Luscious.
- Added filler content as a Pug partial.
- Optimized svgs included in Fresh.

3.0.2
------------------
- Removed `main.sass` starter file.
- Merged the Gulpy repo into Fresh
- Removed `__rsc__` directory. Removed `humans.txt` and `robot.txt` from repo.
- Moved `README-template.md` to project root.
- instead of symlinking core dependencies from `./node_modules`, now using automated install script to move them to `./dependencies` directory. This should be a lot less error prone on Windows OS and will give you the ability to optionally track them in the repo in case you need to make changes to the core for a specific project.

3.0.1
------------------
- Added a 'hack' to the install script to check for the existence of the `README_fresh.md` file before trying to rename `README.md`. This should temporarily keep the installer from exiting with an error.
- Updated dependency versions: - Luscious V0.0.2 - Gulpy v0.0.2 - Fresh-Scaffold v0.0.3

2.0.5
------------------
- Removed the 'tabify' task from gulp.
- Minor version bump when moving from Github.

2.0.4
------------------
- You can now pipe data into your `.pug` files from `./dev/views/data.json` and gulp will auto-reload/run the `views` task and refresh browser when the `.json` file is changed.
- Added 'POSTLAUNCH' and '2DO-LATER' tags as defaults to the 'gulp todo' task. These can be changed in `./gulp/_config.options.js`.

2.0.3
------------------
- Added 'fresh-resources' to `.gitignore` so I can symlink to my local repo to make my life easier :)
- Added console.log message for `gulp build` to remind you if of the build type (either static or dynamic) and what to do next.
- Fixed the source path for the `images` task so that any image directory that includes '@@' in the name is ignored when running `gulp build` on a Dynamic project (used for outputting a CMS template).

2.0.2
------------------
- Gulp-data is now baked into the views task if you are using pug for your template engine. When running `gulp init` a data.json file is also added in the `./dev` folder to help you get started.

2.0.1
------------------
- Pretty much everything has been rebuilt. Will add documentation as time permits.

1.1.8
------------------
- Skipped to v2.0.1

1.1.7
------------------
- Changed `sass` parent-directory in the `dev` directory to `styles`.
- Changed `pug` parent-directory in the `dev` directory to `views`.
- Changed `js` parent-directory in the `dev` directory to `scripts`.
- Decided to bump the version name up to 1.1.7 instead of 1.0.7 due to file structure changes.

1.0.6
------------------
- Added github pages task for dev environment `gulp deploy`.

1.0.5
------------------
- Added ability to import markdown files directly into pug and compile to html. Added .md files to `gulp watch` that compiles pug on save.
- Added option to turn linting on/off for Javascript files.
- Cleaned up `gulp sass` stream to perform better.

1.0.4
------------------
- Bugfix: Gulp todo returned path errors. - Fixed.
- Added `_config.js` to the `gulp todo` blacklist.
- Added an admin task `gulp refresh` to remove all files setup when running `gulp init`. (This is mainly to make testing for me easier.)
- Changed the `add readme` option in `config` to be turned on by default.

1.0.3
------------------
- Bugfix: BrowserSync watching/reloading HTML when using Pug.
- Basic Dev-Templates auto added with `gulp init` task.
- index.pug/html file with minimal presets.
- main.scss/sass
- normalize.css (v3.0.3)

1.0.2
------------------
- Moved the user config file `_config.js` to the project root and added an importer file `_config-import.js` to the `./gulp` tasks directory.
- Added conditional to `gulp init` that produces an index.html file even when Pug is not being used in the project.
- Changed the default option to include Pug in the project to `false`.
- Turned off Sass-Linting as the default.
- Made the sass import file user configurable.
- Converted initial dev files/directories into variables to be controlled through 'config.js'

1.0.1
------------------
- (HotFix) Added `gulp-cssnano` to dependencies.

1.0.0
------------------
- Initial Release