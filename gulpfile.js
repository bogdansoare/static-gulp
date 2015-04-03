var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var cssnext = require("gulp-cssnext");
var browserSync = require('browser-sync');

gulp.task('fileinclude', function() {
  return  gulp.src("src/*.html")
    .pipe(fileinclude())
    .pipe(gulp.dest('./dist'));
});

gulp.task('html-watch', ['fileinclude'], browserSync.reload);

gulp.task("cssnext", function() {
  return gulp.src("src/css/base.css")
    .pipe(cssnext({
        compress: false
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.reload({stream:true}));
});


// Watch css AND html files, doing different things with each.
gulp.task('serve', ['cssnext', 'fileinclude'], function () {

  // Serve files from the root of this project
  browserSync({
      server: {
          baseDir: "./dist"
      }
  });

  gulp.watch("src/css/**/*.css", ['cssnext']);
  gulp.watch("src/**/*.html", ['html-watch']);
});


// Default task to be run with `gulp`
gulp.task('default', ["serve"]);


