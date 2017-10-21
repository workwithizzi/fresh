# Removes all the stuff that is added while running `yarn install` and `gulp`

test:
	node install_test.js


remove:
	rm -rf ./gulp
	rm -rf ./gulpfile.js
	rm -rf ./gulp.options.js

	rm -rf ./dev
	rm -rf ./.editorconfig
	rm -rf ./.jshintignore
	rm -rf ./.pug-lintrc
	rm -rf ./.stylishcolors
	rm -rf ./.sass-lint.yml

	rm -rf ./README.md
	mv ./README_fresh.md ./README.md

	rm -rf ./staging
	rm -rf ./build

burn:
	make remove
	rm -rf ./node_modules
