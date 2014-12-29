'use strict';

var assert = require('assert');
var gutil  = require('gulp-util');
var liquid = require('./index');
var fs     = require('fs');

it('should return valid output', function (cb) {
    var stream = liquid({
        locals: {
            name: "tobi"
        },
        filters: {
            casecamel: function (value) {
                return value.toString(0, -1) + value.toString()[value.length - 1].toUpperCase();
            }
        }
    });

    stream.on('data', function (file) {
        assert('hi tobI', file.contents.toString());
        cb();
    });

    stream.write(new gutil.File({
        path: 'file.liquid',
        contents: new Buffer('hi {{name | casecamel}}')
    }));
});

it('should throw on error', function (cb) {
    var stream = liquid({
        locals: {
            name: "tobi"
        }
    });

    stream.on('error', function (err) {
        assert(typeof err, gutil.PluginError);
        cb();
    });

    stream.write(new gutil.File({
        path: 'file.liquid',
        contents: new Buffer('hi {{name | casecamel}}')
    }));
});
