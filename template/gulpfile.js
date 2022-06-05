const {series} = require('gulp');
// var typedoc = require('gulp-typedoc');

var gulp = require('gulp');

const template = require('gulp-template');
const {argv} = require('yargs');

// gulp.task('typedoc', function () {
//   return gulp
//     .src([
//       'src/**/*.ts',
//       'src/**/*.tsx',
//       // 'src/**/**/**/*.tsx',
//       // 'src/**/**/*.tsx',
//     ])
//     .pipe(
//       typedoc({
//         // inputFiles: ['src'],
//         module: 'commonjs',
//         target: 'es5',
//         out: 'documentation',
//         name: 'Nutrisfinest Health',
//         // mode: 'file',
//         ignoreCompilerErrors: true,
//         theme: 'node_modules/typedoc-neo-theme/bin/default',
//         excludeNotExported: true,
//       }),
//     );
// });

gulp.task('createFeature', () => {
  const {name} = argv;

  if (name && name.length > 0) {
    const destinationPath = `src/store/${name}`;

    gulp
      .src('templates/store/actions.ts')
      .pipe(template({name}))
      .pipe(gulp.dest(destinationPath));

    gulp
      .src('templates/store/reducers.ts')
      .pipe(template({name}))
      .pipe(gulp.dest(destinationPath));

    gulp
      .src('templates/store/types.ts')
      .pipe(template({name}))
      .pipe(gulp.dest(destinationPath));

    return;
  }

  console.log('******************************************');
  console.log('* ERROR: You must provide a feature name *');
  console.log('* HINT:  gulp createFeature --name login *');
  console.log('******************************************');
});

gulp.task('createContainer', () => {
  const {name} = argv;

  if (name && name.length > 0) {
    const destinationPath = `src/containers/${name}`;
    const componentDestinationPath = `src/components/${name}`;

    gulp
      .src('templates/containers/container.tsx')
      .pipe(template({name}))
      .pipe(gulp.dest(destinationPath));

    gulp
      .src('templates/containers/index.tsx')
      .pipe(template({name}))
      .pipe(gulp.dest(destinationPath));

    gulp
      .src('templates/components/component.tsx')
      .pipe(template({name}))
      .pipe(gulp.dest(componentDestinationPath));

    gulp
      .src('templates/components/index.tsx')
      .pipe(template({name}))
      .pipe(gulp.dest(componentDestinationPath));

    return;
  }

  console.log('******************************************');
  console.log('* ERROR: You must provide a feature name *');
  console.log('* HINT:  gulp createFeature --name login *');
  console.log('******************************************');
});

// exports.default = series('typedoc');
