#!/usr/bin/env bash

# Stages, commits, and pushes files to repo
git add .
echo "Enter commit message"
read REPLY
git commit -m "$REPLY -$USER"
git push origin master



# echo "Enter commit message"
# read REPLY
# git commit -am "$REPLY"
# git push