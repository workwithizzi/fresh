#!/usr/bin/env bash
# Removes all the stuff that is added while running `yarn install` and `gulp`
# ###################################################################

refresh() {
	rm -rf ./dependencies
	rm -rf ./gulpfile.js
	rm -rf ./gulp.options.js

	rm -rf ./dev
	rm -rf ./.editorconfig
	rm -rf ./.jshintignore
	rm -rf ./.pug-lintrc
	rm -rf ./.stylishcolors
	rm -rf ./.sass-lint.yml

	if [ -f "./__rsc__/README_fresh.md" ]; then
		rm -rf ./README.md
		mv ./__rsc__/README_fresh.md ./README.md
	fi

	rm -rf ./staging
	rm -rf ./build
	rm -rf ./__rsc__
}


burn() {
	refresh
	rm -rf ./node_modules
}
