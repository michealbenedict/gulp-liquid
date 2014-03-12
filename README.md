# gulp-liquid
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Gulp task to render using [liquid templating engine](https://github.com/Shopify/liquid)

## Usage

First, install `gulp-liquid`

```shell
npm install --save-dev gulp-liquid
```

Then, add it to your `gulpfile.js`:

```javascript
var liquid = require("gulp-liquid");

gulp.src("./src/*.ext")
	.pipe(liquid({
		locals: {}
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### liquid(options)

#### options.templatePath
Type: `String`
Default: `undefined`
Required: `true`

#### options.locals
Type: `Object`
Default: `{}`
Required: `true`

The locals object is passed as template variables to the liquid templating engine.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-liquid
[npm-image]: https://badge.fury.io/js/gulp-liquid.png

[travis-url]: http://travis-ci.org/rowoot/gulp-liquid
[travis-image]: https://secure.travis-ci.org/rowoot/gulp-liquid.png?branch=master

[coveralls-url]: https://coveralls.io/r/rowoot/gulp-liquid
[coveralls-image]: https://coveralls.io/repos/rowoot/gulp-liquid/badge.png

[depstat-url]: https://david-dm.org/rowoot/gulp-liquid
[depstat-image]: https://david-dm.org/rowoot/gulp-liquid.png
