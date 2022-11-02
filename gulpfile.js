const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const outputFolder = 'pages/';
const jsOutput = 'pages/js';
const cssOutput = 'pages/css';

// Use dart-sass for @use
sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
    // Compile Sass
    return src('src/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer()/*, cssnano()*/]))
        .pipe(dest(cssOutput, { sourcemaps: '.' }));
}

// JavaScript Task
function tsTask() {
    // Compile ts files into js and then process it with babel
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest(jsOutput, { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'pages/',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('pages/**/*.html', browserSyncReload);
    watch('src/scss/**/*.scss', series(scssTask, browserSyncReload));
    watch('src/ts/**/*.ts', series(tsTask, browserSyncReload));
}

// serving Gulp page
exports.default = series(scssTask, tsTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask, tsTask);
