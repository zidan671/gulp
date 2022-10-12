const { src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const app = require('../config/app.js')

// Плагины
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const autoPrefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const size = require('gulp-size')
const groupCssMediaQueris = require('gulp-group-css-media-queries')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')

// Обработка SCSS
const scss = function () {
  return src(path.scss.src, { sourcemaps: app.isDev})
        .pipe(plumber({
          errorHandler: notify.onError(error => ({
            title: "SCSS",
            message: error.message
          }))
        }))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(groupCssMediaQueris())
        .pipe(size({ title: 'До сжатия'}))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev}))
        .pipe(rename({ suffix:".min"}))
        .pipe(csso())
        .pipe(size({ title: 'После сжатия'}))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev}))
      
}


module.exports = scss