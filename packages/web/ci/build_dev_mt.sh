#!/usr/bin/env bash
set -e
set -x

rm -rf ./dist

# build dev1
mkdir -p ./dist/dev1
yarn build:dev1
mv ./build ./dist/dev1

# build dev2
mkdir -p ./dist/dev2
yarn build:dev2
mv ./build ./dist/dev2
