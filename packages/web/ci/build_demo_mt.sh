#!/usr/bin/env bash
set -e
set -x

rm -rf ./dist

# build demo
mkdir -p ./dist/demo
yarn build:demo
mv ./build ./dist/demo

# build market
mkdir -p ./dist/market
yarn build:market
mv ./build ./dist/market

# build mycujoo
mkdir -p ./dist/mycujoo
yarn build:mycujoo
mv ./build ./dist/mycujoo

# build partner12
mkdir -p ./dist/partner12
yarn build:partner12
mv ./build ./dist/partner12

# build partner21
mkdir -p ./dist/partner21
yarn build:partner21
mv ./build ./dist/partner21

# build weev
mkdir -p ./dist/weev
yarn build:weev
mv ./build ./dist/weev
