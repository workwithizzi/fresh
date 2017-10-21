# Removes all the stuff that is added while running `yarn install` and `gulp`

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


# Remove Gulp symlink and copy tasks to project
track-gulp:
	@[[ -L "./gulp" ]] && rm -rf ./gulp && cp -r ./node_modules/gulpy/gulp ./gulp || echo Gulp is already being tracked


# Remove Luscious symlink and copy files to project
track-luscious:
	@[[ -L "./dev/styles/01_utils/luscious" ]] && rm -rf ./dev/styles/01_utils/luscious && cp -r ./node_modules/luscious-sass ./dev/styles/01_utils/luscious || echo Luscious is already being tracked

# Add Gulp and Luscious to the project
track-all:
	make add-gulp
	make add-luscious