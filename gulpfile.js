const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const sync = require("browser-sync").create();

function html() {
  return src("src/**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"));
}

exports.html = html;
