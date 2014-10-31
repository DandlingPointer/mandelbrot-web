#!/bin/bash
git reset --hard HEAD
git checkout master
cd scripts/
node ../tools/r.js -o baseUrl=. name=main out="../out/main.js"
cd ..
cp css/main.css out/main.css
cp index.html out/index.html
git checkout gh-pages
rm -rf main.js
rm -rf index.html
rm -rf main.css
cp out/main.js main.js
cp out/index.html index.html
cp out/main.css main.css
sed -i.bak "s/<script data-main=\"scripts\/main\" src=\"scripts\/require.js\"><\/script>/<script src=\"main.js\"><\/script>/g"
sed -i.bak "s/<link rel=\"stylesheet\" type=\"text\/css\" href=\"css\/main.css\">/<link rel=\"stylesheet\" type=\"text\/css\" href=\"main.css\">/g"
