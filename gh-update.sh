#!/bin/bash
git reset --hard HEAD
git checkout master
cd tools/
node r.js -o build.js
cp css/main.css out/main.css
cp index.html out/index.html
cd ..
git checkout gh-pages
rm -rf main.js
rm -rf index.html
rm -rf main.css
cp out/main.js main.js
cp out/index.html index.html
cp out/main.css main.css
sed -i "s/<script data-main=\"scripts\/main\" src=\"scripts\/require.js\"><\/script>/<script src=\"main.js\"><\/script>/g"
sed -i "s/<link rel=\"stylesheet\" type=\"text\/css\" href=\"css\/main.css\">/<link rel=\"stylesheet\" type=\"text\/css\" href=\"main.css\">/g"
