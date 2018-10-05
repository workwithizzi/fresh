[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

---

**v3.0.6**

# Fresh Starter Kit

A starter framework for building web projects using Yarn, Sass, Gulp, Pug, and some other modern tools. The main goal for this kit is to be get you up and running as fast as possible using the tools and configurations that we use most.

## Requirements

- [Node/NPM](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [LibSass](http://sass-lang.com/libsass)
- [Gulp](http://gulpjs.com/)


## Features

- Uses Yarn instead of NPM to bring in our own git repos as dependencies
- Automated environment setup
- Modular so that the Gulp tasks and SASS library are managed independently
- Live reloading with BrowserSync
- README template for your new project
- Compiles SASS/Pug
- Lints SASS/Pug/JS
- Optimizes production build
- The voice of [Cleveland Brown](https://goo.gl/ucD1CT). Seriously. Try running `gulp boom` if you don't believe me.

## Installation

### [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)

- [Windows](https://goo.gl/mcfQkQ)
- MacOS: Using [Homebrew](http://brew.sh/):

```Sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then Node:

```sh
brew install node
```

### Yarn

- [Windows](https://goo.gl/2TGGzK)
- MacOS: `brew install yarn`

### Gulp

Install Gulp Globally with NPM: `npm install gulp -g`

### Get Fresh

Clone this repo to your local environment or download the zip file.

### Install Dependencies

_Note: By default, this will install Luscious (our SASS library) and also open-sans font files. If you want to use it and/or our SASS scaffold in your project, follow the setup instructions below for Luscious._

```sh
cd your/fresh/project && yarn
```


## Project Setup

1.  Update your info in the `package.json` file.
2.  To update project directory paths and configs, go to `./gulpfile.js`.
3.  To see a list of gulp tasks available in Fresh:

		```sh
		gulp help
		```

4.  Run the default Gulp task to get the party started:

		```sh
		gulp
		```

5.  When you are ready to create your optimized, production site, run:

		```sh
		gulp build
		```

### Luscious SASS Scaffold
To use our scaffold as a starting point for your SASS, run the following commands.
**WARNING**: This is destructive and will wipe out your current `src/sass`
	```sh
	rm -rf ./src/sass && cp -r ./node_modules/luscious/scaffold/ ./src/sass
	```

[Open-Sans](https://www.npmjs.com/package/open-sans-fonts) font is the default font used in our Scaffold. If you don't want to use it in the project, just remove it from the fonts directory:

	```sh
	rm -rf ./src/fonts/open-sans
	```


Either way, make sure your font-paths in `_settings.scss` are correct

### Optional Dependencies

- Owl-carousel (CSS/JS)
	If you need a slider/carousel dependency for the project, add it to the `build/` directory in the following way:

	```shell
	yarn add -D owl.carousel
	cp "./node_modules/owl.carousel/dist/assets/owl.carousel.css" "./build/css"
	cp "./node_modules/owl.carousel/dist/owl.carousel.js" "./build/js"
	```

- Normalize.css
	If you need Normalize.css dependency for the project, add it to the `build/` directory in the following way:

	```shell
	yarn add -D normalize.css
	cp "./node_modules/normalize.css/normalize.css" "./build/css"
	```

- Font-awesome
	If you need font-awesome dependency for the project, add it to the `build/` directory in the following way:

	```shell
	yarn add -D font-awesome
	cp "./node_modules/font-awesome/css/font-awesome.css" "./build/css"
	cp -a "./node_modules/font-awesome/fonts/" "./build/fonts"
	```

### Configuration

**BrowserSync Settings:**

- proxy: use when you you're running a local server like MAMP
- server: build directory
- open: open a new browser window to localhost:port
- injectChanges: inject css changes without reloading browser
- notify: show notifications in browser
- port: define the localhost port (default == 3000)
- ui port: Port for configuring browserSync UI options
- tunnel: external tunnel `example.localtunnel.me`

**Watch Files:** Comment out files that you don't want to watch/trigger the build process.

**Vendors:** To import project vendors/dependencies, just add them to the `vendors` array.

**Use Gulp Concat:** Running `gulp build` or `gulp concat` will concat and minify your css and javascript in the `./build` directory. Make sure to use the comments in your html like:

```html
<!-- build:css css/main.min.css -->
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->
```

---


## TODO

- Add modernizr for png fallback for svgs and JS detection.

## Changelog

- v3.0.7 _Upcoming_
	- Added HTML5 test content into pug partials
	- Removed tasks to get `normalize css` and fontawesome dependencies from the default task.
	- Removed development/production environment variables.
		- Tasks effected: `styles`,`scripts`,`build`,`pug`, `production` (removed).
		- Removed dependency `gulp-environments`
	- Removed html minification from `gulp concat` so that the task only works with concating and minifying js and css.
	- Added a new task `gulp minify` to specifically handle html minification.
	- Removed tasks specifically created to import project dependencies (`get:normalize`, `get:jquery`, `get:owlcarousel` and combined them all into a single task `gulp vendors` that is controlled by a config array `vendors`
	- Removed tasks `gulp todo` and `gulp todo:clean` in favor of just using the ide built-in search feature
	- Removed `gulp cms` and related tasks: `convert:404`, `convert:html`, `convert:css`, `touch:index`
	- Combined tasks `clean:build` and `images:clean:cache` into a single task called `clean`
	- Added task `gulp open` and alias `gulp o`. Task opens browser to specified file
	- Fixed `html2pug` task that's used to convert html to pug in the `./src/views` directory.
	- Moved main navigation data to the `site.json` file.
	- Removed the `_skiplink.pug` file and placed the skiplink code directly in `_base.pug`.
- v3.0.6
	- Hotfix to remove metalsmith tasks/dependencies that were accidentally merged into the production release.
- v3.0.5
	- Changed install script task to `gulp initial:help` to give user feedback on how to set up initial SASS scaffold.
- v3.0.4
	- Updated Luscious dependency to v0.0.5.
	- Separated Pug dummy content into slightly smaller section files.
- v3.0.3
	- Updated Gulp tasks. - Added Run-Sequence to `gulp default` task so that gulp finishes before browser window loads. - Added Gulp-data to merge multiple data files into a single file for use with Pug. - Added data files to `gulp watch`. - Added `gulp normalize:css` task. - Added `basedir` option to pug task so that the `basedir` is set to `./src/views`. - Moved install.js scripts to a gulp task as `gulp luscious` and `gulp scaffold`. - Added `gulp fontawesome` task to move fonts from `node_modules` to `./build`.
	- Added basic navigation to Pug and JS. SASS styles are added through Luscious.
	- Added skiplink to Pug and JS. SASS styles are added through Luscious.
	- Added filler content as a Pug partial.
	- Optimized svgs included in Fresh.
- v3.0.2
	- Removed `main.sass` starter file.
	- Merged the Gulpy repo into Fresh
	- Removed `__rsc__` directory. Removed `humans.txt` and `robot.txt` from repo.
	- Moved `README-template.md` to project root.
	- instead of symlinking core dependencies from `./node_modules`, now using automated install script to move them to `./dependencies` directory. This should be a lot less error prone on Windows OS and will give you the ability to optionally track them in the repo in case you need to make changes to the core for a specific project.
- v3.0.1
	- Added a 'hack' to the install script to check for the existence of the `README_fresh.md` file before trying to rename `README.md`. This should temporarily keep the installer from exiting with an error.
	- Updated dependency versions: - Luscious V0.0.2 - Gulpy v0.0.2 - Fresh-Scaffold v0.0.3
- v2.0.5
	- Removed the 'tabify' task from gulp.
	- Minor version bump when moving from Github.
- v2.0.4
	- You can now pipe data into your `.pug` files from `./dev/views/data.json` and gulp will auto-reload/run the `views` task and refresh browser when the `.json` file is changed.
	- Added 'POSTLAUNCH' and '2DO-LATER' tags as defaults to the 'gulp todo' task. These can be changed in `./gulp/_config.options.js`.
- v2.0.3
	- Added 'fresh-resources' to gitignore so I can symlink to my local repo to make my life easier :)
	- Added console.log message for `gulp build` to remind you if of the build type (either static or dynamic) and what to do next.
	- Fixed the source path for the `images` task so that any image directory that includes '@@' in the name is ignored when running `gulp build` on a Dynamic project (used for outputting a CMS template).
- v2.0.2
	- Gulp-data is now baked into the views task if you are using pug for your template engine. When running `gulp init` a data.json file is also added in the `./dev` folder to help you get started.
- v2.0.1
	- Pretty much everything has been rebuilt. Will add documentation as time permits.
- v1.1.8
	- Skipped to v2.0.1
- v1.1.7
	- Changed `sass` parent-directory in the `dev` directory to `styles`.
	- Changed `pug` parent-directory in the `dev` directory to `views`.
	- Changed `js` parent-directory in the `dev` directory to `scripts`.
	- Decided to bump the version name up to 1.1.7 instead of 1.0.7 due to file structure changes.
- v1.0.6
	- Added github pages task for dev environment `gulp deploy`.
- v1.0.5
	- Added ability to import markdown files directly into pug and compile to html. Added .md files to `gulp watch` that compiles pug on save.
	- Added option to turn linting on/off for Javascript files.
	- Cleaned up `gulp sass` stream to perform better.
- v1.0.4
	- Bugfix: Gulp todo returned path errors. - Fixed.
	- Added `_config.js` to the `gulp todo` blacklist.
	- Added an admin task `gulp refresh` to remove all files setup when running `gulp init`. (This is mainly to make testing for me easier.)
	- Changed the `add readme` option in `config` to be turned on by default.
- v1.0.3
	- Bugfix: BrowserSync watching/reloading HTML when using Pug.
	- Basic Dev-Templates auto added with `gulp init` task.
	- index.pug/html file with minimal presets.
	- main.scss/sass
	- normalize.css (v3.0.3)
- v1.0.2
	- Moved the user config file `_config.js` to the project root and added an importer file `_config-import.js` to the `./gulp` tasks directory.
	- Added conditional to `gulp init` that produces an index.html file even when Pug is not being used in the project.
	- Changed the default option to include Pug in the project to `false`.
	- Turned off Sass-Linting as the default.
	- Made the sass import file user configurable.
	- Converted initial dev files/directories into variables to be controlled through 'config.js'
- v1.0.1
	- (HotFix) Added `gulp-cssnano` to dependencies.
- v1.0.0
	- Initial Release

## Meta

Yisrael Grimes - @GrimesClassic

Distributed under the uncopyright license. Which, isn't technically a license, but it should be. You can read more about it from [Brian Gardner](https://briangardner.com/uncopyright/) of StudioPress fame.

---

## Thanks

This project is mostly just a bunch of stuff that was taken from of people. These are a few of them:

- Mina Markham's [Sassy Starter](https://github.com/minamarkham/sassy-starter)
- [Zell Liew](https://zellwk.com/)
- [Hugo Giraudel](http://hugogiraudel.com/)
