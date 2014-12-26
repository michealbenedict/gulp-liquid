'use strict'

var path        = require('path');
var gutil       = require('gulp-util');
var through     = require('through2');
var fs          = require('fs');
var Liquid      = require("liquid-node");
var PluginError = gutil.PluginError;

/*
 * gulp-liquid
 * @param opts.locals {Object} - Locals that should be passed to files
 * @param opts.tags {Object} - Locals that should be passed to files
 **/
module.exports = function (opts) {
    opts = opts || {};

    var engine = new Liquid.Engine;

    if ( opts.tags && typeof opts.tags == "object" ) {
        /* Register liquid tags prior to processing */
        Object.keys(opts.tags).forEach(function (tag) {
            engine.registerTag(tag, opts.tags[tag]);
        });
    }

    if ( opts.filters && typeof opts.filters == "object" ) {
        Object.keys(opts.filters).forEach(function (filter) {
            engine.registerFilters(opts.filters);
        });
    }

    function liquid (file, enc, callback) {
        /*jshint validthis:true*/
        var template;
        var promise;

        if (file.isNull()) {
            return callback();
        }

        if (file.isStream()) {
            this.emit("error", new gutil.PluginError("gulp-liquid", "Stream content is not supported"));
            return callback();
        }

        if (file.isBuffer()) {
            engine.parseAndRender(file.contents.toString(), opts.locals)
            .then(function (output) {
                file.contents = new Buffer(output);
                this.push(file);
                callback();
            })
            .catch(function (err) {
                new PluginError('gulp-liquid', err, { showStack: true });
            })
            .done();
        }
    }

    return through.obj(liquid);
};
