#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# init git and commit
git init
git add -A
git commit -m 'deploy'

# force push to gh-pages branch (используем master, т.к. это ветка по умолчанию в свежем репозитории)
git push -f https://github.com/kalikrit/weather-app-vue.git master:gh-pages

cd -