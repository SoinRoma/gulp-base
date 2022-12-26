const { src, dest, series, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const del = require("del");

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

function clear() {
  return del("dist");
}

function dev() {
  sync.init({
    server: "./dist",
  });

  watch("src/**.htnl", series(html)).on("change", sync.reload);
  watch("src/scss/**.scss", series(scss)).on("change", sync.reload);
}

exports.build = series(clear, scss, html);
exports.dev = series(clear, scss, html, dev);
exports.clear = clear;
