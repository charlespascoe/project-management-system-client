const args = require('yargs').argv,
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      buffer = require('vinyl-buffer'),
      glob = require('glob'),
      gulp = require('gulp'),
      gulpif = require('gulp-if'),
      merge = require('merge-stream'),
      nodemon = require('gulp-nodemon'),
      rimraf = require('rimraf'),
      scss = require('gulp-sass'),
      source = require('vinyl-source-stream'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify');

const outputDir = './.compiled-client';

gulp.task('clean', function (cb) {
  rimraf(outputDir, cb);
});

gulp.task('build', ['clean'], function () {
  var prod = args.production;

  return merge(
    gulp.src('./src/public/**/*')
      .pipe(gulp.dest(outputDir + '/public/')),
    gulp.src('./src/style/**/*.scss')
      .pipe(gulpif(!prod, sourcemaps.init()))
      .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
      .pipe(autoprefixer())
      .pipe(gulpif(!prod, sourcemaps.write('.')))
      .pipe(gulp.dest(outputDir + '/public/css/')),
    browserify({entries: './src/client/app.js', debug: !prod, paths: ['./node_modules', './src/']})
      .transform(babelify, {presets: ['react', 'es2015'], plugins: ['transform-async-to-generator'], sourceMaps: !prod})
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulpif(prod, uglify()))
      .pipe(gulp.dest(outputDir + '/public/js/'))
  );
});

gulp.task('build-dev', ['build'], function () {
  return merge(
    gulp.src('./src/server/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({plugins: ['transform-async-to-generator', 'transform-es2015-modules-commonjs']}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(outputDir + '/server')),
    gulp.src(outputDir + '/public/**/*')
      .pipe(gulp.dest(outputDir + '/server/public/'))
  );
});

gulp.task('start', ['build-dev'], function () {
  return nodemon({
    script: outputDir + '/server/index.js',
    watch: 'src/**/*.*',
    ignore: '*.swp',
    tasks: ['build-dev']
  });
});

