const args = require('yargs').argv,
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      buffer = require('vinyl-buffer'),
      glob = require('glob'),
      gulp = require('gulp'),
      gulpif = require('gulp-if'),
      livereload = require('gulp-livereload'),
      merge = require('merge-stream'),
      nodemon = require('gulp-nodemon'),
      rimraf = require('rimraf'),
      scss = require('gulp-sass'),
      source = require('vinyl-source-stream'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      watchify = require('watchify');

const outputDir = './.compiled-client';

gulp.task('clean', function (cb) {
  rimraf(outputDir, cb);
});

function buildClient(watch, out = outputDir) {
  var prod = args.production;

  var bundler = browserify('./src/client/app.js', {
    debug: !prod,
    paths: ['./node_modules/', './src/'],
    cache: {}, // required for watchify
    packageCache: {} // required for watchify
  });

  if (watch) {
    bundler.plugin(watchify);
  }

  bundler.transform(babelify, {presets: ['react', 'es2015'], plugins: ['transform-async-to-generator'], sourceMaps: !prod})

  function rebundle() {
    console.log('Rebundle!');
    return bundler.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulpif(prod, uglify()))
      .pipe(gulp.dest(out + '/public/js/'))
      .pipe(livereload());
  }

  bundler.on('update', rebundle);

  return rebundle();
}

gulp.task('build', ['clean'], function () {
  return merge(
    gulp.src('./src/public/**/*')
      .pipe(gulp.dest(outputDir + '/public/')),
    buildClient(false)
  );
});

gulp.task('build-watch', function () {
  return merge(
    gulp.src('./src/public/**/*')
      .pipe(gulp.dest(outputDir + '/server/public/')),
    buildClient(true, outputDir + '/server')
  );
});

gulp.task('build-server', function () {
  return gulp.src('./src/server/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({plugins: ['transform-async-to-generator', 'transform-es2015-modules-commonjs']}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(outputDir + '/server'));
});

function buildStyle(dev) {
  var prod = args.production;
  return gulp.src('./src/style/**/*.scss')
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulpif(!prod, sourcemaps.write('.')))
    .pipe(gulp.dest(`${outputDir}${dev ? '/server' : ''}/public/css/`))
    .pipe(livereload());
}

gulp.task('style', function () {
  return buildStyle(false);
});

gulp.task('style-dev', function () {
  return buildStyle(true);
});

gulp.task('nodemon', ['build-server'], function () {
  livereload.listen();
  return nodemon({
    script: outputDir + '/server/index.js',
    ext: 'js',
    ignore: ['src/client/', './src/style/', outputDir],
    tasks: ['build-server']
  });
});

gulp.task('style-watch', ['style-dev'], function () {
  gulp.watch(
    ['./src/style/**/*'], ['style-dev']
  );
});

gulp.task('start', ['build-watch', 'nodemon', 'style-watch']);

