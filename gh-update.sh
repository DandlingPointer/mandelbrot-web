git reset --hard HEAD
git checkout master
cd ./tools
node r.js -o build.js
cd ..
git checkout gh-pages
rm -rf main.js
cp out/main.js main.js
