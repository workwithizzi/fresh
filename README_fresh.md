[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

---

**v3.0.0**

# Fresh Starter Kit

A starter framework for building web projects using Yarn, Sass, Gulp, Pug, and some other modern tools. The main goal for this kit is to be get you up and running as fast as possible using the tools and configurations that we use most.


## Requirements

- [Node/NPM](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [LibSass](http://sass-lang.com/libsass)
- [Gulp](http://gulpjs.com/)

### To roll our workflow
- [Gulpy](https://github.com/yisraelgrimes/gulpy): To handle all your build tasks.
- [Fresh-Scaffold](https://github.com/fresh-scaffold): To set up your dev structure.
- [Luscious](https://github.com/yisraelgrimes/luscious-sass): For our SASS mixins and functions.


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

```sh
git clone https://github.com/yisraelgrimes/fresh.git
```

### Dependencies

Installs: [Gulpy](https://github.com/yisraelgrimes/gulpy), our [Fresh-Scaffold](https://github.com/fresh-scaffold), and our SASS kit— [Luscious](https://github.com/yisraelgrimes/luscious-sass)— for you.

```sh
cd your/fresh/project && yarn install
```

*This downloads all your dependencies to the `./node_modules` directory and sets up initial project dev files in `./dev`.*


## Project Setup

1. Update your info in the `package.json` file.
2. To update project directory paths, go to `./gulpfile.js`.
3. To change any project configs, go to `./gulp.options.js`.
4. Run the default Gulp task to get the party started:

	```sh
	gulp
	```

5. When you are ready to create your optimized, production site, run:

	```sh
	gulp build
	```
	
Something to note with the build command, the output styling will be determined by the buildType variable set in `./gulp.options.js`. 'Static' will produce a completely minified version of the site while 'Dynamic' will minify everything except HTML files and will ignore any files/directories that have '@@' in the name. This is so that you can have a static demo of the site, and then run `gulp cms` to produce a production version ready to be used in cms templating with dynamic content. 

6. If you want to deploy your project Github pages, first run `gulp deploy:setup` to create a gh-pages branch and configure it. After that, all you need to do is run `gulp deploy` from the branch that you want to deploy. Keep in mind that you will need write privileges on the repo to deploy pages. The setup task has only been tested on Mac OS and uses several bash scripts wrapped in 'gulp-shell' so you may want to check them out before running it. The file is `./gulp/shell/ghpages.sh`. The scripts will:
	- Create a gh-pages branch.
	- Create/add a temporary README.md file.
	- Create/add a .gitignore file and add `node_modules` to the ignore list.
	- Commit the files/changes and push to the gh-pages branch.
	- Checkout the Master branch.

Running `gulp deploy` will, by default, copy everything from `./build` to be published.


---

## Changelog
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
