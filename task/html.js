const { src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')

// Плагины
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

// Обработка HTML
const html = function () {
  return src(path.html.src)
        .pipe(plumber({
          errorHandler: notify.onError(error => ({
            title: "HTML",
            message: error.message
          }))
        }))
        .pipe(fileInclude())
        .pipe(size({ title: 'До сжатия'}))
        .pipe(htmlmin({
          collapseWhitespace: true
        }))
        .pipe(size({ title: 'После сжатия'}))
        .pipe(dest(path.root))
        
      
}


module.exports = html