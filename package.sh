#!/bin/bash
set -euo pipefail

START_TIME=$SECONDS

echo "Building package..."
rm -rf ./lib
npm run build
rm -rf ./package
mkdir ./package

echo "Copying files..."
cp -r ./lib ./package/lib
cp ./package.json ./Readme.md ./LICENSE ./CHANGELOG.md ./package

echo "Adjusting package.json..."
npm pkg set private=false --json --prefix ./package
npm pkg delete scripts.prepare --prefix ./package

ELAPSED_TIME=$((SECONDS - START_TIME))
echo "Done in $ELAPSED_TIME seconds!"
