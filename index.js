'use strict'

var path		= require('path');
var gutil 		= require('gulp-util');
var through 	= require('through2');
var fs 			= require('fs');
var Liquid 		= require("liquid-node");
var PluginError = gutil.PluginError;

/*
 * gulp-liquid
 * @param opts.locals {Object} - Locals that should be passed to files
 * @param opts.tags {Object} - Locals that should be passed to files
**/
module.exports = function (opts) {
	opts = opts || {};

	if ( opts.tags && typeof opts.tags == "object" ) {
		/* Register liquid tags prior to processing */
		Object.keys(opts.tags).forEach(function (tag) {
			Liquid.Template.registerTag(tag, opts.tags[tag]);
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
			this.emit("error",
				new gutil.PluginError("gulp-liquid", "Stream content is not supported"));
			return callback();
		}

		if (file.isBuffer()) {
			template = Liquid.Template.parse(file.contents.toString());
			promise = template.render(opts.locals);

			promise.then(function (output) {
		        file.contents = new Buffer(output);
		        this.push(file);
		        callback();
    		}.bind(this), function (err) {
    			new PluginError('gulp-liquid', 'Error during conversion');
    		});
		}
	}

	return through.obj(liquid);
};
