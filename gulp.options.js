// Gulpy v0.0.2
//
// Configures options for gulp tasks
// -------------------------------------------------------------------


// -------------------------------------
// Project Type: Static or Dynamic (CMS)
// -------------------------------------
var buildType = 'static';     // HTMl
// var buildType = 'dynamic'; // CMS Site


// -------------------------------------
// Dev Server Config
// -------------------------------------
// Tunnel for remote access.
// [false] : Turns off external access
// [True]  : Attempts to use a ranome public url
// [String]: Attempts to use the string. Like: 'string.localtunnel.me'
var tunnel = 'fresh';


// -------------------------------------
// Views: (html/pug/php/md)
// -------------------------------------
// Turn off pug compiling
var usePug = true;

// Lint Pug files
var lintPug = true;

// Send data to pug from json file
var pipeData = true;

// Path to data.json file for pug
// HOTFIX: Figure out why variable here doesn't work on Windows
var dataPath = './dev/views/data.json';


// -------------------------------------
// Styles: (sass/scss/css)
// -------------------------------------
// Lint Sass (Config file: './gulp/__rsc__/.sass-lint.yml')
var lintSass = false;

// Files to skip linting
var sassLintX = [
	'**/*normalize*.+(sass|scss)',
];


// -------------------------------------
// Scripts
// -------------------------------------
// Lint Js
var lintJs = true;

// Automaitcally fix jslinting errors with fixmyjs
var fixJs = true;


// -------------------------------------
// Package for Production
// -------------------------------------
// 2DO-GULPY: Add an optional download for these files with a gulp task or node script
// Add these files to production build
// var packGitignore  = true;  // .gitignore (from Fresh-resources)
// var packRobots     = true;  // robots.txt (from Fresh-resources)
// var packHumans     = true;  // humans.txt (from Fresh-resources)
// var packReadme     = true;  // Project README.md
// var packChangelog  = true;  // changelog (if avaialable)


// -------------------------------------
// Todo
// -------------------------------------
// Tags to use in creating todo file
var todoTags = [
	'HOTFIX',
	'REVIEW',
	'2DO-CH',
	'2DO-YG',
	// '2DO-FRESH',
	'2DO-GULPY',
	'POSTLAUNCH',
	'2DO-LATER',
];

// Files to search for tags
var todoFiles = './gulp/**/*.+(html|css|js|sass|scss|pug)';
// var todoFiles = './dev/**/*.+(html|css|js|sass|scss|pug)';

// Output location for todo list
var todoOutput = './';


// -------------------------------------------------------------------
// Output conditions based on above settings
// -------------------------------------------------------------------

// Project Output Type
var isDynamic = true;
var isStatic = false;
if (buildType == 'static') {
	var isDynamic = false;
	var isStatic = true;
}


// -------------------------------------------------------------------
// Project Variables: to export
// -------------------------------------------------------------------
module.exports = {
	// Project Output Type
	buildType: buildType,         // env-string-[static or dynamic]
	isDynamic: isDynamic,         // env-bool
	isStatic: isStatic,           // env-bool

	// BrowserSync Tunnel
	tunnel: tunnel,               // bool or string
	// Views
	usePug: usePug,               // views-bool
	lintPug: lintPug,             // views-bool
	pipeData: pipeData,           // views-bool
	dataPath: dataPath,           // views-string

	// Styles
	lintSass: lintSass,           // styles-bool
	sassLintX: sassLintX,         // styles-array

	// Scripts
	lintJs: lintJs,               // scripts-bool
	// jshintignore: jshintignore,   // scripts-bool
	fixJs: fixJs,                 // scripts-bool

	// Package Files for Production
	// packHumans: packHumans,       // build-bool
	// packRobots: packRobots,       // build-bool
	// packReadme: packReadme,       // build-bool
	// packGitignore: packGitignore, // build-bool
	// packChangelog: packChangelog, // build-bool

	// Todo
	todoTags: todoTags,           // todo-array
	todoFiles: todoFiles,         // todo-string
	todoOutput: todoOutput,       // todo-string

};
