var gulp = require('gulp');

// Load all Gulp plugins
var autoprefix    = require('gulp-autoprefixer'),
    cache         = require('gulp-cache'),
    concat        = require('gulp-concat'),
    cssimport     = require('gulp-cssimport'),
    debug         = require('gulp-debug'),
    insert        = require('gulp-insert'),
    minifyCSS     = require('gulp-minify-css'),
    order         = require('gulp-order'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    sass          = require('gulp-sass'),
    entityconvert = require('gulp-entity-convert');

// Custom CSS.
// Generates a CSS from Sass (SCSS),
// uses autoprefix to automatically create vendor prefixes for browser-compatibility (see https://github.com/ai/autoprefixer)
// inlines imported CSS from external vendors, (note that this should after auto-prefix because we presume that vendors have already prefixed their CSS)
// then minifies it
gulp.task('css', function () {
  gulp.src('./src/stylesheets/styles.scss')
    .pipe(sass(), { errLogToConsole: true })
    .pipe(autoprefix('last 2 versions', 'Explorer > 8'))
    .pipe(cssimport())
    // .pipe(minifyCSS({ keepSpecialComments: 0 }))
    .pipe(debug({ verbose: false }))
    .pipe(insert.prepend('\n\n\n/*\n *\n *\n *\n * This file was automatically generated from /src by Gulp.\n * Do not edit directly unless Gulp is removed from this repository!\n *\n *\n *\n */\n\n\n\n\n'))
    .pipe(gulp.dest('./css'));
});

// Javascripts
gulp.task('js', function () {
  // Package Javascripts in a specified order
  gulp.src('./src/js/**/*.js')
    .pipe(order([
      'vendor/**/*.js',
      '*.js'
      ]))
    .pipe(concat('package.js'))
    .pipe(insert.prepend('\n\n\n/*\n *\n *\n *\n * This file was automatically generated from /src by Gulp.\n * Do not edit directly unless Gulp is removed from this repository!\n *\n *\n *\n */\n\n\n\n\n'))
    .pipe(gulp.dest('./js'));
});


gulp.task('misc', function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./'));
  gulp.src('./src/data/rainfallByCity.json')
    .pipe(gulp.dest('./data'));

});


