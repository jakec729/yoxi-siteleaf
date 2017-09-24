var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
var plumber         = require('gulp-plumber');
var browserify      = require('gulp-browserify');
var prefix          = require('gulp-autoprefixer');
var cp              = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var paths = {
    sass_dir: 'assets/sass',
    sass_main: 'assets/sass/main.scss',
    css_dir: 'assets/css',
    base_dir: '_site',
    globs: {
        sass: [
            './assets/sass/**/*.sass',
            './assets/sass/*.sass',
            './assets/sass/**/*.scss',
            './assets/scss/*.sass',
        ],
        scripts: [
            './assets/js/*.js'
        ],
        content: [
            '_includes/**/*.html', 
            '_layouts/**/*.html', 
            '**/*.md', 
            '_data/**/*.yml', 
            '_data/**/*.yaml', 
            '*.yml', 
            '*.yaml', 
            '**/*.markdown', 
            'assets/js/*.js',
            '!_site'
        ]
    }
};

gulp.task('jekyll-build', ['assets'], function (done) {
    browserSync.notify({jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'});
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({ server: { baseDir: paths.base_dir } });
});

gulp.task('assets', ['sass', 'scripts']);

gulp.task('sass', function () {
    return gulp.src(paths.sass_main)
        .pipe(plumber())
        .pipe(sass({ includePaths: paths.sass_dir, onError: browserSync.notify }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(paths.base_dir + '/' + paths.css_dir))
        .pipe(gulp.dest(paths.css_dir))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function() {
    gulp.src('assets/js/scripts.js')
        .pipe(browserify({ insertGlobals : true }))
        .pipe(gulp.dest('assets/js/dist'))
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(paths.globs.sass, ['sass']);
    gulp.watch(paths.globs.scripts, ['scripts']);
    gulp.watch(paths.globs.content, ['jekyll-rebuild']);
});

gulp.task('default', ['watch']);