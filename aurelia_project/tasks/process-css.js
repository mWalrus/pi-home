import {CLIOptions, build} from 'aurelia-cli';
import gulp from 'gulp';
import project from '../aurelia.json';
import sass from 'gulp-dart-sass';
import sassPackageImporter from 'node-sass-package-importer';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssUrl from 'postcss-url';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source, {sourcemaps: true})
    .pipe(
      // sassPackageImporter handles @import "~bootstrap"
      // https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-package-importer
      CLIOptions.hasFlag('watch') ?
        sass.sync({importer: sassPackageImporter()}).on('error', sass.logError) :
        sass.sync({importer: sassPackageImporter()})
    )
    .pipe(postcss([
      autoprefixer(),
      // Inline images and fonts
      postcssUrl({url: 'inline', encodeType: 'base64'}),
      cssnano()
    ]))
    .pipe(build.bundle());
}

