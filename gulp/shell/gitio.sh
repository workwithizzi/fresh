#!/usr/bin/env bash

# function gitio() {
# 	if [ -z "${1}" -o -z "${2}" ]; then
# 		echo "Usage: enter your slug, followed by the original url";
# 		return 1;
# 	fi;
# 	curl -i https://git.io/ -F "url=${2}" -F "code=${1}";
# }

echo "Let's make a short git url..."
echo "Enter the url."
read URL
echo "Enter the slug you want to use..."
read SLUG
curl -i https://git.io/ -F "url=$URL" -F "code=$SLUG";