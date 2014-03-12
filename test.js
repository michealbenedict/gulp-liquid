'use strict';

var assert    = require('assert');
var gutil     = require('gulp-util');
var liquid 	  = require('./index');
var fs 		  = require('fs');

it('should return valid output', function (cb) {
	var stream = liquid({
		locals: {
			name: "tobi"
		}
	});

	stream.on('data', function (file) {
		assert('hi tobi', file.contents.toString());
		cb();
	});

	stream.write(new gutil.File({
		path: 'file.liquid',
		contents: new Buffer('hi {{name}}')
	}));
});
