const { src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const app = require('../config/app.js')

// Плагины
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const concat = require('gulp-concat')
const cssImport = require('gulp-cssimport')    
const autoPrefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const size = require('gulp-size')
const groupCssMediaQueris = require('gulp-group-css-media-queries')

// Обработка CSS
const css = function () {
  return src(path.css.src, { sourcemaps: true})
        .pipe(plumber({
          errorHandler: notify.onError(error => ({
            title: "CSS",
            message: error.message
          }))
        }))
        .pipe(concat("main.css"))
        .pipe(cssImport())
        .pipe(autoPrefixer())
        .pipe(groupCssMediaQueris())
        .pipe(size({ title: 'До сжатия'}))
        .pipe(dest(path.css.dest, { sourcemaps: true}))
        .pipe(rename({ suffix:".min"}))
        .pipe(csso())
        .pipe(size({ title: 'После сжатия'}))
        .pipe(dest(path.css.dest, { sourcemaps: true}))
      
}


module.exports = css