[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

---

**v3.0.7**

# Fresh Starter Kit

A starter framework for building web projects using Yarn, Sass, Gulp, Pug, and some other modern tools. The main goal for this kit is to help get you up and running fast using the tools and configurations that we use most.

## Requirements
- [Node/NPM](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [LibSass](http://sass-lang.com/libsass)
- [Gulp](http://gulpjs.com/)


## Features
- Live reloading with BrowserSync
- README template for your new project
- Development:
	- SASS: compiling/auto-prefixing/linting/auto-fix
	- Js: compiling/linting
	- Pug: compiling, data injection
- Production
	- Code minification
	- Image Optimization
	- Package up production files


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
Clone this repo or download the zip file.

### Install Dependencies
_Note: By default, this will install Luscious (our SASS library) and also open-sans font files. If you want to use it and/or our SASS scaffold in your project, follow the setup instructions below for Luscious._

```sh
cd your/fresh/project && yarn
```

## Project Setup & Usage

1. Update your project info in the `package.json` file.
2. Update project directory paths and settings:
	- Go to `./gulpfile.js`. All project settings are set to variables at the top.
3. Use the Luscious Scaffold to start your SASS:
	**WARNING**: This is destructive and will wipe out your current `src/sass`
	```sh
	rm -rf ./src/sass && cp -r ./node_modules/luscious/scaffold/ ./src/sass
	```
4. To see a list of available gulp tasks, run `gulp help`
5. Then, run `gulp` (default task) to get started:
6. When you're ready to create your production site, run `gulp build`


### Optional Dependencies
- Open-Sans
	[Open-Sans](https://www.npmjs.com/package/open-sans-fonts) font is the default font used in our Scaffold. If you don't want to use it in the project, just remove it from the fonts directory:
	```sh
	rm -rf ./src/fonts/open-sans
	```
and then removed the install script/and dependency in `package.json`--You'll also want to remove the related code in the Scaffold files (in `sass/base/*`).

- Owl-carousel (CSS/JS)
	If you need a slider/carousel dependency for the project, add it to `package.json` (`yarn add -D owl.carousel`) and add the task `owl` to the `gulp compile` task. Also make sure to add it to your html.

- Normalize.css
	If you want to use Normalize.css, add it to the `build/` directory:
	```shell
	yarn add -D normalize.css
	cp "./node_modules/normalize.css/normalize.css" "./build/css"
	```

- Font-awesome
	If you want to use font-awesome, add it to the `build/` directory:
	```shell
	yarn add -D font-awesome
	cp "./node_modules/font-awesome/css/font-awesome.css" "./build/css"
	cp -a "./node_modules/font-awesome/fonts/" "./build/fonts"
	```

### Configuration
- **BrowserSync Settings:**
	- proxy: use when you you're running a local server like MAMP
	- server: build directory
	- open: open a new browser window to localhost:port (see `var openBrowserWindow` in `gulpfile.js`)
	- injectChanges: inject css changes without reloading browser
	- notify: show notifications in browser
	- port: define the localhost port (default == 3000)
	- ui port: Port for configuring browserSync UI options
	- tunnel: external tunnel `example.localtunnel.me`
- **Watch Files:** Comment out files that you don't want to watch and trigger the build process.
- **Gulp Concat:** Running `gulp build` or `gulp concat` will concatenate and minify your css and javascript in the `./build` directory. Define what to concat using comments in your html like:
	```html
	<!-- build:css css/main.min.css -->
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/main.css">
	<!-- endbuild -->
	```

---


## TODO
- Add modernizr for png fallback support for svgs and JS detection.


## Meta
Yisrael Grimes - @GrimesClassic

Distributed under the uncopyright license. Which, isn't technically a license, but it should be. You can read more about it from [Brian Gardner](https://briangardner.com/uncopyright/) of StudioPress fame.
