#!/bin/zsh
echo "STARTING SCRIPT!"
echo ""
echo "REMOVING NODE MODULES"
rm -rf node_modules/ 
rm -rf packages/*/node_modules/
echo ""
echo "REMOVING DIST DIRECTORIES"
rm -rf packages/*/dist/
echo ""
echo "REMOVING TS BUILD INFO FILES"
rm packages/*/tsconfig.tsbuildinfo
echo ""
echo "CLEANING YARN CACHE"
yarn cache clean
echo ""
echo "INSTALLING PACKAGES"
yarn
echo ""
echo "INSTALLING IOS PODS, CLEANING IOS BUILD"
cd packages/mobile/ios
xcodebuild clean
pod install
cd ../../.. 
echo ""
echo "CLEANING WATCHMAN"
watchman watch-del $(pwd)
echo ""
echo "SETTING UP WATCHMAN"
watchman watch-project $(pwd)
echo ""
echo "DONE!"
echo ""
echo "If any errors occured during this script evaluation... just don't care 😅"
echo ""
echo ""

