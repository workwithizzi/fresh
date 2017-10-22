#!/usr/bin/env bash

# git checkout --orphan gh-pages && git rm -rf . && touch README.md && git add README.md && touch .gitignore && echo "node_modules" > .gitignore && git add .gitignore && git commit -m "Init gh-pages" && git push --set-upstream origin gh-pages &&  git checkout master

git checkout --orphan gh-pages 
git rm -rf . 
touch README.md 
git add README.md 
touch .gitignore 
echo "node_modules" > .gitignore 
git add .gitignore 
git commit -m "Init gh-pages" 
git push --set-upstream origin gh-pages 
git checkout master