const { src, dest, series } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();

function html() {
  return src("src/**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"));
}

function scss() {
  return src("src/scss/**.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(csso())
    .pipe(concat("index.css"))
    .pipe(dest("dist"));
}

exports.html = html;
exports.scss = scss;
